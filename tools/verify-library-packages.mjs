import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { delimiter, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);

// pnpm only hoists @types/* packages that are direct workspace dependencies, so ambient
// globals shipped by transitive @types packages (e.g. @vueuse/core -> @types/web-bluetooth)
// are invisible to a tsconfig's default typeRoots walk. Resolve their real location instead.
function resolveAmbientTypeRoot(typesPackage, fromPackage) {
  const fromPackageDirectory = dirname(require.resolve(`${fromPackage}/package.json`, { paths: [workspaceRoot] }));
  const typesPackageJson = require.resolve(`${typesPackage}/package.json`, { paths: [fromPackageDirectory] });
  return dirname(dirname(typesPackageJson));
}

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDirectory, '..');
const npmCache = resolve(workspaceRoot, '.npm-cache');

const npmInvocation = (() => {
  const executableDirectories = (process.env.PATH ?? '').split(delimiter).filter(Boolean);
  const npmCliCandidates = [
    ...new Set([
      resolve(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js'),
      resolve(dirname(process.execPath), '../node_modules/npm/bin/npm-cli.js'),
      resolve(dirname(process.execPath), '../lib/node_modules/npm/bin/npm-cli.js'),
      ...executableDirectories.flatMap((directory) => [
        resolve(directory, 'node_modules/npm/bin/npm-cli.js'),
        resolve(directory, '../node_modules/npm/bin/npm-cli.js'),
        resolve(directory, '../lib/node_modules/npm/bin/npm-cli.js'),
        resolve(directory, '../share/nodejs/npm/bin/npm-cli.js'),
      ]),
    ]),
  ];
  const npmCli = npmCliCandidates.find(existsSync);
  if (npmCli) return { command: process.execPath, args: [npmCli] };
  if (process.platform !== 'win32') return { command: 'npm', args: [] };

  fail('Unable to locate npm CLI');
})();

const libraries = ['vuejs-ui'];

const forbiddenContent = [
  { pattern: /@ui\//, label: 'internal @ui alias' },
  { pattern: /@\/shared\//, label: 'frontend application alias' },
  { pattern: /(?:^|["'(])node_modules\//, label: 'package-manager-internal module path' },
  { pattern: /apps[\\/]pf-admin_(?:front|api)-app[\\/]/, label: 'application source path' },
  { pattern: /[A-Za-z]:[\\/]Users[\\/]/, label: 'absolute Windows user path' },
  { pattern: /\/home\/[^/]+\//, label: 'absolute Unix home path' },
];

function fail(message) {
  throw new Error(message);
}

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory)) {
    const path = resolve(directory, entry);
    if (statSync(path).isDirectory()) files.push(...walk(path));
    else files.push(path);
  }
  return files;
}

for (const project of libraries) {
  const directory = resolve(workspaceRoot, 'dist', 'libs', project);
  const manifestPath = resolve(directory, 'package.json');

  if (!existsSync(manifestPath)) fail(`${project}: missing built package.json`);

  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const expectedName = `@profeskills/${project}`;

  if (manifest.name !== expectedName) fail(`${project}: expected package name ${expectedName}`);
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(manifest.version)) {
    fail(`${project}: invalid semantic version ${manifest.version}`);
  }
  if (manifest.private === true) fail(`${project}: distribution package is private`);
  if (manifest.license !== 'MIT') fail(`${project}: license must be MIT`);
  if (manifest.publishConfig?.access !== 'public') fail(`${project}: npm access must be public`);
  if (manifest.publishConfig?.registry && manifest.publishConfig.registry !== 'https://registry.npmjs.org/') {
    fail(`${project}: unexpected npm registry ${manifest.publishConfig.registry}`);
  }
  if (!String(manifest.repository?.url ?? '').includes('forge.profeskills.com/jal-group/vuejs-libs')) {
    fail(`${project}: repository metadata does not point to the vuejs-libs repo`);
  }

  for (const required of ['main', 'types']) {
    if (!manifest[required]) fail(`${project}: missing ${required} entry`);
    if (!existsSync(resolve(directory, manifest[required]))) {
      fail(`${project}: ${required} target does not exist (${manifest[required]})`);
    }
  }

  for (const requiredFile of ['LICENSE', 'README.md']) {
    if (!existsSync(resolve(directory, requiredFile))) fail(`${project}: missing ${requiredFile}`);
  }

  for (const file of walk(directory)) {
    if (!/\.(?:js|cjs|mjs|d\.ts|json)$/.test(file)) continue;
    const content = readFileSync(file, 'utf8');
    for (const forbidden of forbiddenContent) {
      if (forbidden.pattern.test(content)) {
        fail(`${project}: ${forbidden.label} leaked into ${file.slice(directory.length + 1)}`);
      }
    }
  }

  const pack = spawnSync(npmInvocation.command, [...npmInvocation.args, 'pack', '--dry-run', '--json', directory], {
    cwd: workspaceRoot,
    encoding: 'utf8',
    env: { ...process.env, npm_config_cache: npmCache },
  });

  if (pack.error) throw pack.error;
  if (pack.status !== 0) fail(`${project}: npm pack failed\n${pack.stderr}`);

  const packResult = JSON.parse(pack.stdout);
  if (packResult.length !== 1 || packResult[0].name !== expectedName || packResult[0].entryCount < 1) {
    fail(`${project}: npm pack returned an unexpected package description`);
  }

  const entryUrl = `${pathToFileURL(resolve(directory, manifest.main)).href}?verify=${Date.now()}`;
  const imported = await import(entryUrl);
  if (Object.keys(imported).length === 0 && project !== 'vuejs-ui') {
    fail(`${project}: runtime entry point exports nothing`);
  }

  console.log(`✓ ${expectedName}@${manifest.version} (${packResult[0].entryCount} files)`);
}

const consumerDirectory = mkdtempSync(resolve(tmpdir(), 'profeskills-vuejs-ui-consumer-'));
try {
  const consumerEntry = resolve(consumerDirectory, 'consumer.ts');
  const consumerConfig = resolve(consumerDirectory, 'tsconfig.json');

  writeFileSync(
    consumerEntry,
    "import { Dialog, HBadge, Tabs } from '@profeskills/vuejs-ui'\nvoid [Dialog, HBadge, Tabs]\n",
    'utf8',
  );
  writeFileSync(
    consumerConfig,
    `${JSON.stringify(
      {
        compilerOptions: {
          target: 'ESNext',
          module: 'ESNext',
          moduleResolution: 'Bundler',
          strict: true,
          skipLibCheck: false,
          noEmit: true,
          noUncheckedSideEffectImports: true,
          lib: ['ESNext', 'DOM'],
          // moduleResolution: 'Bundler' does not auto-include every package found under typeRoots,
          // so the ambient web-bluetooth globals @vueuse/core expects must be named explicitly here.
          typeRoots: [
            resolve(workspaceRoot, 'node_modules/@types'),
            resolveAmbientTypeRoot('@types/web-bluetooth', '@vueuse/core'),
          ],
          types: ['web-bluetooth'],
          paths: {
            '@profeskills/vuejs-ui': [resolve(workspaceRoot, 'dist/libs/vuejs-ui/index.d.ts')],
            '@profeskills/vuejs-ui/*': [resolve(workspaceRoot, 'dist/libs/vuejs-ui/*')],
          },
        },
        files: [consumerEntry],
      },
      null,
      2,
    )}\n`,
    'utf8',
  );

  const typecheck = spawnSync(
    process.execPath,
    [resolve(workspaceRoot, 'node_modules/typescript/bin/tsc'), '--project', consumerConfig],
    { cwd: workspaceRoot, encoding: 'utf8' },
  );
  if (typecheck.error) throw typecheck.error;
  if (typecheck.status !== 0) {
    fail(`vuejs-ui: strict consumer typecheck failed\n${typecheck.stdout}${typecheck.stderr}`);
  }
  console.log('✓ @profeskills/vuejs-ui strict consumer declarations');
} finally {
  rmSync(consumerDirectory, { recursive: true, force: true });
}

console.log('All library packages are buildable, self-contained, and packable.');
