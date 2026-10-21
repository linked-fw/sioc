---
'@_linked/sioc': minor
---

The ontology data ships as Turtle.

- `src/data/sioc.json` and `sioc-types.json` are replaced by `src/data/sioc.ttl` (669 triples)
  and `sioc-types.ttl` (226), copied into `lib/esm/data/` by the build. `loadData()` now reads
  both (`sioc-types` was not loaded before) and resolves to their Turtle text (`string[]`, read
  through `@_linked/core/ontology/loadOntologyFiles`, server only); the module exports
  `dataFiles`.
- The package declares that it mirrors `http://rdfs.org/sioc/ns#`, so the shape check reports
  any term in it the data does not define. `npm test` runs `test/shape-check.test.mjs`, which
  asserts the check finds nothing in this package.
