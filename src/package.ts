import { linkedPackage } from '@_linked/core/utils/Package';
import { createLinkedComponentFn } from '@_linked/react/utils/LinkedComponent';

const {
  linkedShape,
  linkedUtil,
  linkedOntology,
  registerPackageExport,
  registerPackageModule,
  getPackageShape,
  packageExports,
  packageName,
} = linkedPackage('@_linked/sioc', {mirrors: 'http://rdfs.org/sioc/ns#'});

const linkedComponent = createLinkedComponentFn(
  registerPackageExport,
  () => {}
);

export {
  linkedComponent,
  linkedShape,
  linkedUtil,
  linkedOntology,
  registerPackageExport,
  registerPackageModule,
  getPackageShape,
  packageExports,
  packageName,
};
