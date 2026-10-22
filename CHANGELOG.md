# @\_linked/sioc

## 1.5.0

### Minor Changes

- [#54](https://github.com/linked-fw/sioc/pull/54) [`460a0e2`](https://github.com/linked-fw/sioc/commit/460a0e20e01b23ad6f5abd6ac43887588ae6a2c8) Thanks [@flyon](https://github.com/flyon)! - The ontology data ships as Turtle.
  
  - `src/data/sioc.json` and `sioc-types.json` are replaced by `src/data/sioc.ttl` (669 triples)
    and `sioc-types.ttl` (226), copied into `lib/esm/data/` by the build. `loadData()` now reads
    both (`sioc-types` was not loaded before) and resolves to their Turtle text (`string[]`, read
    through `@_linked/core/ontology/loadOntologyFiles`, server only); the module exports
    `dataFiles`.
  - The package declares that it mirrors `http://rdfs.org/sioc/ns#`, so the shape check reports
    any term in it the data does not define. `npm test` runs `test/shape-check.test.mjs`, which
    asserts the check finds nothing in this package.

## 1.4.0

### Minor Changes

- [#49](https://github.com/linked-fw/sioc/pull/49) [`fa7a595`](https://github.com/linked-fw/sioc/commit/fa7a595bf77b126e62714f813cad143a0d445704) Thanks [@flyon](https://github.com/flyon)! - Depend on `@_linked/react@^2.0.0` (was `^1.0`), `@_linked/schema@^1.5.0` (was `^1.0`, the first schema release on `@_linked/react` 2) and `@_linked/core@^2.27.0` (was `^2.22.8`, the core peer range `@_linked/react` 2 requires).
  
  An app on `@_linked/react` 2 no longer installs a second copy of `@_linked/react` 1 through this package or through schema. The only thing used from it is `createLinkedComponentFn`, which 2.0 did not change.
  
  Minor rather than major: `@_linked/react` is a regular dependency here, not a peer, so no consumer has to change anything to install this release; and a major would force auth and every app on `@_linked/sioc@^1` to change its range just to pick it up.

## 1.3.7

### Patch Changes

- [#47](https://github.com/linked-fw/sioc/pull/47) [`a431b80`](https://github.com/linked-fw/sioc/commit/a431b809372e6328ac14411ec94aa1d8724d5b9f) Thanks [@flyon](https://github.com/flyon)! - The `build` script is now `linked build`, the same build CI and the release workflow already run, so a local build produces the published `lib/` (compiled output, copied `src` assets and rewritten ESM import specifiers). The `build-esm` and `copy-to-lib` scripts and the `rimraf`/`copyfiles` dev dependencies are removed.

## 1.3.6

### Patch Changes

- [#45](https://github.com/linked-fw/sioc/pull/45) [`f80dd63`](https://github.com/linked-fw/sioc/commit/f80dd639f84b06a72558e4306243ff4176b0536a) Thanks [@flyon](https://github.com/flyon)! - Declares its React peer; accepts React 18 or 19. The components import `react`, which is now a `peerDependencies` entry (`^18.2.0 || ^19.0.0`) so the consumer's single React copy is used.

## 1.3.5

### Patch Changes

- [#42](https://github.com/linked-fw/sioc/pull/42) [`9a8add8`](https://github.com/linked-fw/sioc/commit/9a8add829c8f8a22da700e3c630de464d804b960) Thanks [@flyon](https://github.com/flyon)! - Publish only the files consumers need; the tarball no longer includes `.changeset/`, `.gitattributes`, `.github/`, `renovate.json` or tsconfig files.

## 1.3.4

### Patch Changes

- [#38](https://github.com/linked-fw/sioc/pull/38) [`f7ed26b`](https://github.com/linked-fw/sioc/commit/f7ed26b7eddee165596afc3d4890902eb6c23801) Thanks [@flyon](https://github.com/flyon)! - Remove `custom-declarations`, an ambient `declare module '*.css' | '*.scss'` module that nothing in this package imports — sioc imports no CSS at all. The published package loses `lib/esm/custom-declarations.{d.ts,js,js.map}` and nothing else; the entry `index.d.ts` never referenced it. Because `exports` carries a `./*` wildcard, the subpath `@_linked/sioc/custom-declarations` resolved before and will not resolve now. The `.js` behind it was empty, so the only way a consumer could have relied on it is by importing it for the ambient CSS-module typings; declare those locally instead.

## 1.3.3

### Patch Changes

- [#31](https://github.com/linked-fw/sioc/pull/31) [`c27cbe1`](https://github.com/linked-fw/sioc/commit/c27cbe108efb9d42fd9dcb547d39d867fe8e362c) Thanks [@flyon](https://github.com/flyon)! - Add `shapes/index`, a side-effect-only module that registers every shape this package defines and nothing else (no components, no CSS), so `import '@_linked/sioc/shapes/index'` loads the shapes in plain node as well as in a bundle. The package entry now imports it instead of listing shapes one by one.

## 1.3.2

### Patch Changes

- [#29](https://github.com/linked-fw/sioc/pull/29) [`252f0e7`](https://github.com/linked-fw/sioc/commit/252f0e7f50a70272856c6ccb796c64b8a83385e8) Thanks [@flyon](https://github.com/flyon)! - Fix shape references that could never resolve, and register what they name.

  Space and Usergroup named their value shapes under the package's old name
  (`['lincd-sioc', …]`), so `Space.usergroups`, `Usergroup.members` and
  `Usergroup.spaces` pointed at `…/shape/lincd-sioc/…` IRIs that no shape has. They
  now use this package's name.

  Space, Usergroup and UserAccount also import each other for the side effect: naming
  a shape does not register it, so loading one of them alone left the others
  unregistered and a query traversing to them threw `Shape class not found`.
  `UserAccount.accountOf` references schema's Person class directly.

## 1.3.1

### Patch Changes

- [#21](https://github.com/linked-fw/sioc/pull/21) [`c8b623b`](https://github.com/linked-fw/sioc/commit/c8b623bc5b181d7d116fde9613ec81ae127b0cbf) Thanks [@flyon](https://github.com/flyon)! - Sourcemaps now embed their TypeScript source, so consumers no longer see 'points to missing source files' warnings.

## 1.3.0

### Minor Changes

- [#18](https://github.com/linked-fw/sioc/pull/18) [`00cde66`](https://github.com/linked-fw/sioc/commit/00cde662f504d5c625bfe2ac235603efee205225) Thanks [@flyon](https://github.com/flyon)! - Require `@_linked/core@^2.22.8` (was `^2.0`), and pin it in the lockfile.

  The declared range was wide enough that the resolved core depended on whatever the
  consumer — or this repo's own CI, via `package-lock.json` — happened to install. Core
  decides how a shape's IRI is minted, so a stale core made this package emit legacy
  `data.lincd.org` IRIs instead of the arch-02 `linked.cm` scheme. Which IRIs a published
  package produces should not be a function of the installer's dependency tree.

  Minor rather than patch: this raises the minimum core a consumer must resolve, so it
  changes what gets installed rather than only what this package does internally.

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
