# vuejs-libs

> [!WARNING]
> **Pre-release — not production-ready.** These packages are under active development (pre-`1.0.0`) and have **not yet been through a human stabilization and review pass**. Their APIs may change at any time, without a deprecation cycle. They are published for early experimentation and feedback only — **do not use them in production**. This notice will be removed at the `1.0.0` release.

Vue 3 libraries published under the `@jaltech` npm scope. This is a [pnpm](https://pnpm.io/) workspace monorepo; each library is released as an independent npm package.

## Packages

| Package | Version | Description | Docs |
|---|---|---|---|
| [`@jaltech/vuejs-ui`](vuejs-ui) | [![npm](https://img.shields.io/npm/v/@jaltech/vuejs-ui)](https://www.npmjs.com/package/@jaltech/vuejs-ui) | Vue 3 component library and design system (~65 component families, composables, advanced data table, dark mode). | [README](vuejs-ui/README.md) |

## Using these packages

Install a package as a normal npm dependency, for example:

```bash
pnpm add @jaltech/vuejs-ui
```

`@jaltech/vuejs-ui` is distributed **source-first**, so consumers need a bundler that compiles Vue SFCs and TypeScript (Vite is recommended) plus a small amount of setup — see the [package README](vuejs-ui/README.md#installation) for the exact `optimizeDeps` and Tailwind configuration.

## Development

```bash
pnpm install
pnpm check   # typecheck + build + package verification
```

## Releasing

Releases are automated with GitHub Actions ([`.github/workflows/release.yml`](.github/workflows/release.yml)):

1. Bump `version` in the package's `package.json` and add a `CHANGELOG.md` entry, then merge to `main`.
2. Push a tag of the form `<package>@<version>`, e.g. `vuejs-ui@0.3.11`:

   ```bash
   git tag vuejs-ui@0.3.11
   git push origin vuejs-ui@0.3.11
   ```

3. The workflow validates the package (name, version, license, access), builds and verifies it, then publishes to npm. A pre-release version (containing `-`) is published under the `next` dist-tag; otherwise `latest`.

Publishing requires an `NPM_TOKEN` secret configured in the repository's GitHub Actions secrets.

## Contributing

Issues and pull requests are welcome at
[github.com/jaltech-io/vuejs-libs](https://github.com/jaltech-io/vuejs-libs).

## License

[MIT](LICENSE) © 2026 Jaltech.
