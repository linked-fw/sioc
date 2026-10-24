# @_linked/sioc

SIOC ([Semantically-Interlinked Online Communities](http://rdfs.org/sioc/spec/))
vocabulary as `@linkedShape` classes.

## Shapes

- `UserAccount` — `sioc:UserAccount`
- `Site` — `sioc:Site`
- `Space` — `sioc:Space`
- `Container` — `sioc:Container`
- `Item` — `sioc:Item`
- `Role` — `sioc:Role`
- `Usergroup` — `sioc:Usergroup`

## Terms

```ts
import * as sioc from '@_linked/sioc/ontologies/sioc';

static targetClass = sioc.UserAccount;
```

`ontologies/sioc` has one named export per term of `http://rdfs.org/sioc/ns#` (99);
`ontologies/sioc.data` holds `ns`, `dataFiles`, `_ontologyResource` and `loadData()`. A term's
export name is its local name (`sioc:account_of` → `sioc.account_of`). `linked generate-ontology`
writes the modules from the data (`package.json` `"linkedOntologies"`), and `linked build` fails
when they are stale; never edit them by hand.

## The data

The data is SIOC as published at its namespaces, in RDF/XML, converted to Turtle with the triples
unchanged; a leading comment names the source:

| File | Source | Version |
|---|---|---|
| `src/data/sioc.ttl` | <http://rdfs.org/sioc/ns> | `owl:versionInfo "Revision: 1.36"`, Last-Modified 2020-06-05 |
| `src/data/sioc-types.ttl` | <http://rdfs.org/sioc/types> | Last-Modified 2020-06-05 |

`sioc-types.ttl` is the SIOC Types module (`http://rdfs.org/sioc/types#`); its subjects are not in
the `sioc:` namespace, so it adds data but no terms. To refresh, download each file with `curl
-sSL -H 'Accept: application/rdf+xml' <source>`, convert it to Turtle, check that the triples
match the download (an RDF/XML `rdf:type` attribute on an empty property element is an IRI, not a
literal), put the comment back, and run `npx linked generate-ontology`.

The official files are the only source of the package's terms: the package never adds a class
or property to a standard's namespace. What the published standard lacks, mainly metadata, goes
in one extra file per prefix, `src/data/<prefix>-added.ttl`, listed in `"linkedOntologies"`' data:

- the ontology entity itself: `owl:Ontology`, title, description,
  `vann:preferredNamespacePrefix`, `vann:preferredNamespaceUri`, the source URL and version;
- annotations on terms the standard already defines, such as a missing `rdfs:label`.

New classes or properties never go there; a term a standard lacks belongs in the consumer's own
ontology package.

Both files carry their own ontology header, so this package has no `-added` file.

## Usage

```ts
import { UserAccount } from '@_linked/sioc/shapes/UserAccount';

const account = await UserAccount.select().one();
console.log(account.accountOf?.givenName);
```

## History

Renamed from `lincd-sioc` to `@_linked/sioc` and migrated out of the
[lincd.org](https://github.com/lincd-org) umbrella in
[create-now plan-011](https://github.com/Semantu/create-now/blob/main/docs/reports/)
(2026-06-12). At the time, the internal source was unchanged — only the package name and
publishing infrastructure were updated to match the modern `@_linked/*`
convention (changesets, dual-package ESM+CJS build, `development`
conditional export for Vite HMR).
