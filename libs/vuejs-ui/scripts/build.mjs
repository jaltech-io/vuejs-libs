import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const libraryRoot = resolve(scriptDirectory, '..');
const workspaceRoot = resolve(libraryRoot, '../..');
const outputDirectory = resolve(workspaceRoot, 'dist/libs/vuejs-ui');
const expectedOutputDirectory = resolve(workspaceRoot, 'dist', 'libs', 'vuejs-ui');

if (outputDirectory !== expectedOutputDirectory) {
  throw new Error(`Refusing to clean unexpected output directory: ${outputDirectory}`);
}

rmSync(outputDirectory, { recursive: true, force: true });

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: libraryRoot,
    stdio: 'inherit',
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(process.execPath, [
  resolve(workspaceRoot, 'node_modules/vite/bin/vite.js'),
  'build',
  '--config',
  resolve(libraryRoot, 'vite.config.ts'),
]);


// Vue conserve sinon le chemin absolu de chaque SFC dans la propriété __file.
// Un chemin stable protège la vie privée des mainteneurs et rend le tarball reproductible.
const sourcePrefix = `${resolve(libraryRoot, 'src').replaceAll('\\', '/')}/`;
const sanitizeCompiledPaths = (directory) => {
  for (const entry of readdirSync(directory)) {
    const path = resolve(directory, entry);
    if (statSync(path).isDirectory()) {
      sanitizeCompiledPaths(path);
      continue;
    }
    if (!path.endsWith('.js')) continue;
    const content = readFileSync(path, 'utf8');
    writeFileSync(path, content.replaceAll(sourcePrefix, '@jaltech/vuejs-ui/'), 'utf8');
  }
};

run(process.execPath, [
  resolve(workspaceRoot, 'node_modules/vue-tsc/bin/vue-tsc.js'),
  '--project',
  resolve(libraryRoot, 'tsconfig.lib.json'),
]);

// Depuis le fix 0.3.1 (tarball sans dist), vite et vue-tsc ecrivent dans
// libs/vuejs-ui/dist (outDir local, voir vite.config.ts / tsconfig.lib.json) :
// on recopie vers la sortie standard du workspace (dist/libs/vuejs-ui) que
// verify-library-packages et la CI publient.
cpSync(resolve(libraryRoot, 'dist'), outputDirectory, { recursive: true });

// Paquet SOURCE-FIRST : les `exports` pointent vers `./src/*` (et le wildcard
// `./* -> ./src/*`), donc le tarball DOIT contenir les sources. Sans cette copie,
// le package publie n'expose que le compile (.js/.d.ts) et tous les sous-chemins
// des consommateurs echouent en TS2307. Regression introduite quand le build a
// commence a restreindre `files` en excluant `src` (voir plus bas) — corrige le
// 27/09/2026, l'ancien @profeskills@0.3.2 publiait bien `src`.
cpSync(resolve(libraryRoot, 'src'), resolve(outputDirectory, 'src'), { recursive: true });

sanitizeCompiledPaths(outputDirectory);

// La feuille CSS est publiée via l'export `./styles.css` et doit être importée
// explicitement par l'application. Son import de build n'a aucun effet de type et
// ferait échouer les consommateurs TypeScript stricts (TS2882) s'il restait dans
// la déclaration racine.
const declarationEntry = resolve(outputDirectory, 'index.d.ts');
const declarationSource = readFileSync(declarationEntry, 'utf8');
const sanitizedDeclaration = declarationSource.replace(/^import ['"]\.\/styles\.css['"];\r?\n/, '');
if (sanitizedDeclaration === declarationSource) {
  throw new Error('Expected the generated declaration to import ./styles.css');
}
writeFileSync(declarationEntry, sanitizedDeclaration, 'utf8');

mkdirSync(outputDirectory, { recursive: true });
for (const file of ['README.md', 'LICENSE']) {
  cpSync(resolve(libraryRoot, file), resolve(outputDirectory, file));
}

const packageJson = JSON.parse(readFileSync(resolve(libraryRoot, 'package.json'), 'utf8'));
delete packageJson.scripts;
delete packageJson.devDependencies;

const rewriteDistPaths = (value) => {
  if (typeof value === 'string') return value.replace(/^\.\/dist\//, './');
  if (Array.isArray(value)) return value.map(rewriteDistPaths);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, rewriteDistPaths(item)]));
  }
  return value;
};

const distributionPackageJson = rewriteDistPaths(packageJson);
distributionPackageJson.files = ['src', '**/*.js', '**/*.d.ts', 'styles.css', 'README.md', 'LICENSE'];

writeFileSync(
  resolve(outputDirectory, 'package.json'),
  `${JSON.stringify(distributionPackageJson, null, 2)}\n`,
  'utf8',
);
