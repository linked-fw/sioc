# @\_linked/sioc

## 1.2.6

### Patch Changes

- [#16](https://github.com/linked-fw/sioc/pull/16) [`7bc36b4`](https://github.com/linked-fw/sioc/commit/7bc36b485b40ff2760a5c970b1cdcc32e11fcc01) Thanks [@flyon](https://github.com/flyon)! - The ontology no longer registers by importing itself.

  It carried `import * as _this from './<prefix>.js'` and passed that namespace to
  `linkedOntology()`. Under `tsc` the self-reference survives; under a bundler it does
  not — Rollup treats it as a circular import and elides it, so the binding is
  `undefined` and a consuming app dies at boot with `_this is not defined`.

  Registration now lives in a `<prefix>.register.ts` sibling, imported from the package
  entry. Nothing changes for consumers: importing this package still registers the
  ontology.

## 1.2.5

### Patch Changes

- [#14](https://github.com/linked-fw/sioc/pull/14) [`9f98853`](https://github.com/linked-fw/sioc/commit/9f9885367c0acc3368aa6c2cc00380fa46c35752) Thanks [@flyon](https://github.com/flyon)! - Compile the whole `src` folder, and let a bare import resolve under Node10.

  The build only emitted what an entry transitively reached, so any module
  nothing imported was never built — and never type-checked, so it rotted
  quietly. `include` now covers `src/**/*` with tests excluded explicitly.

  `typesVersions` maps every specifier through `lib/esm/*`, so a `types` value
  that already carried that prefix had it applied twice and no consumer on
  classic Node10 resolution could `import` the package by its bare name.

## 1.2.4

### Patch Changes

- [#12](https://github.com/linked-fw/sioc/pull/12) [`1eccdab`](https://github.com/linked-fw/sioc/commit/1eccdab36f82a28b5072af74ac5e9fe77e2719d0) Thanks [@flyon](https://github.com/flyon)! - Declare npm as the package manager for this repo, convert the build scripts off `yarn`, and mark `package-lock.json` as a generated file.

## 1.2.2

### Patch Changes

- [#6](https://github.com/linked-cm/sioc/pull/6) [`0389118`](https://github.com/linked-cm/sioc/commit/0389118f989dfd65c04be7a1490ee95909e39ef9) Thanks [@flyon](https://github.com/flyon)! - Remove the `development` export condition (pointed at `src`, which isn't shipped to npm). Monorepo dev resolves workspace source via the cli Vite plugin; standalone resolves `import → lib`. No consumer-visible change.

## 1.2.1

### Patch Changes

- [#3](https://github.com/linked-cm/sioc/pull/3) [`ed6e99a`](https://github.com/linked-cm/sioc/commit/ed6e99a825614ba79d75ce6003a7d55992b39ffe) Thanks [@flyon](https://github.com/flyon)! - loadData: ESM-only JSON import — drop the dead CJS branch, add the `{ with: { type: 'json' } }` import attribute.

## 1.2.0

### Minor Changes

- [#2](https://github.com/linked-cm/sioc/pull/2) [`7af8cc4`](https://github.com/linked-cm/sioc/commit/7af8cc4a5c8da61336b57ed3ff5142cebb54fb5a) Thanks [@flyon](https://github.com/flyon)! - ESM-only. Dropped the CommonJS build; ships ES modules only (`type: module`, no `require` export condition, no `lib/cjs`). Fixed the root `types` field. CJS consumers on Node 22+ can `require()` it (sync ESM) or use dynamic `import()`.

## 1.1.0

### Minor Changes

- [`fe303c7`](https://github.com/linked-cm/sioc/commit/fe303c79e293e630ef788e99f86552f709bb2553) - **Renamed from `lincd-sioc` and extracted from the `lincd.org` umbrella
  to its own workspace + git repo.** This is the first release under the
  `@_linked/sioc` name.

  ### Migration from `lincd-sioc`

  Consumers importing `lincd-sioc` should change the import name only —
  the JS API surface is unchanged from `lincd-sioc@1.0.3`:

  ```diff
  - import { UserAccount } from 'lincd-sioc/shapes/UserAccount';
  + import { UserAccount } from '@_linked/sioc/shapes/UserAccount';
  ```

  ```diff
    "dependencies": {
  -   "lincd-sioc": "~1.0"
  +   "@_linked/sioc": "^1.1"
    }
  ```

  Shape registration strings that named the legacy package also need updating:

  ```diff
  - shape: ['lincd-sioc', 'UserAccount']
  + shape: ['@_linked/sioc', 'UserAccount']
  ```

  (This matters if you persist the registration to a SHACL dataset; the
  backing string is what the framework uses to dispatch.)

  ### What's in this release

  All seven existing sioc shapes:

  - `UserAccount` (sioc:UserAccount)
  - `Site` (sioc:Site)
  - `Space` (sioc:Space)
  - `Container` (sioc:Container)
  - `Item` (sioc:Item)
  - `Role` (sioc:Role)
  - `Usergroup` (sioc:Usergroup)

  Plus the matching `sioc` ontology namespace export, `UserAvatar` +
  `UserName` React components, and the `lincd-types-from-sioc-types.json`
  data fixture.

  ### Internal changes vs `lincd-sioc@1.0.3`

  - **`UserAccount` extends `Shape` directly** (was `Resource` from
    `lincd-rdfs`). `Resource` just extended `Shape` plus a `type` getter
    that returns `null`; the flatter chain is functionally equivalent.
  - **`getAccountOf(_person)` parameter retyped from `foaf:Person` to
    `unknown`**. The method body already threw "not migrated yet" —
    retype reflects the actual usable signature.
  - **Dropped deps: `foaf`, `lincd-rdfs`** (both became unreachable after
    the two changes above).
  - **Modern build pipeline**: dual ESM/CJS output via `rimraf` +
    `tsconfig-to-dual-package`. Replaces the legacy `lincd build` script.
  - **`development` conditional export** added to `package.json` —
    Vite-based consumers resolve straight to `src/` for HMR.
  - **Changesets + CI workflows** added (matching `@_linked/dcat`).

  ### Compatibility

  - API surface unchanged from `lincd-sioc@1.0.3` for all current callers.
  - `getAccountOf<T>(_person)` parameter is now `unknown` instead of
    `foaf:Person`. Calls that pass a foaf Person still compile (unknown
    accepts anything); calls relied on the `foaf:Person` type for
    narrowing would lose that — but since the body unconditionally throws,
    no real call site exercises this.

  Context: see create-now plan-011 report (docs/reports/009-legacy-lincd-eradication.md).

## 1.0.4

### Patch Changes

- Renamed from `lincd-sioc` to `@_linked/sioc` and migrated out of the
  lincd.org umbrella to its own package + git repo. Internal source
  unchanged (already used `@_linked/core` and `@_linked/schema`); only
  package name + tooling structure updated. CN + `@_linked/auth`
  consumers updated to import from `@_linked/sioc/...`. See create-now
  plan-011 §"Phase 4 — Rename lincd-sioc → @\_linked/sioc" for
  motivation and full migration breakdown.
