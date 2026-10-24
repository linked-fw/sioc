---
"@_linked/sioc": minor
---

The `sioc` accessor modules are generated from `src/data/sioc.ttl` and `sioc-types.ttl` by
`linked generate-ontology` (`package.json` `"linkedOntologies"`), and `linked build` fails when
they are stale. `ontologies/sioc` exports one named term for each of the 99 subjects of the
namespace (up from 22). The data files carry a comment naming their source (SIOC's published
RDF/XML, converted to Turtle with the triples unchanged); the README records the sources and the
`-added` convention.

Breaking changes:

- The aggregated `sioc` object is gone. Import the module as a namespace:

  ```ts
  import * as sioc from '@_linked/sioc/ontologies/sioc';
  static targetClass = sioc.UserAccount;
  ```

- `ns`, `dataFiles` and `loadData` moved to `@_linked/sioc/ontologies/sioc.data`; `_self` is now
  `_ontologyResource` there. `import * as sioc` no longer reaches them, and the registered
  ontology carries only its terms.
- Requires `@_linked/core` ^2.41.0, `@_linked/schema` ^1.8.0,
  `@_linked/dcmi` ^1.6.0, `@_linked/xsd` ^1.4.0.
- No terms were renamed.
