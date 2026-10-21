// Runs against the built lib: `linked build && npm test`.
//
// The shape check (`@_linked/core/shapes/checkShapeHierarchy`) holds this package to the rules
// every package that mirrors a published standard follows: each shape's `extends` agrees with
// the class hierarchy in `src/data/sioc.ttl` and `sioc-types.ttl`, each shape owns the class it
// targets, and no shape or exported term uses a `sioc:` IRI that SIOC does not define. Importing
// the shapes registers schema's too (UserAccount uses its Person); only this package's own
// findings count here.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { checkShapeHierarchy } from '@_linked/core/shapes/checkShapeHierarchy';
import '../lib/esm/shapes/index.js';
import '../lib/esm/ontologies/sioc.register.js';
import { packageName } from '../lib/esm/package.js';

const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const MIRRORS = ['http://rdfs.org/sioc/ns#'];
const ownShape = (iri) => typeof iri === 'string' && iri.includes('/shape/sioc/');

describe('shape check', () => {
  it("finds nothing in this package's shapes or in the namespace it mirrors", async () => {
    const findings = await checkShapeHierarchy({
      dependencies: {
        [packageName]: [
          ...Object.keys(manifest.dependencies ?? {}),
          ...Object.keys(manifest.peerDependencies ?? {}),
        ],
      },
    });
    const ours = findings.filter(
      (f) =>
        ownShape(f.shape) ||
        (f.kind === 'mirror-undefined-term' && MIRRORS.some((ns) => f.iri?.startsWith(ns))),
    );
    assert.deepEqual(
      ours.map((f) => `${f.severity} ${f.kind}: ${f.message}`),
      [],
    );
  });
});
