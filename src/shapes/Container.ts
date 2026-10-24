import { Shape } from '@_linked/core/shapes/Shape';
import { linkedShape } from '../package.js';
import * as sioc from '../ontologies/sioc.js';

@linkedShape
export class Container extends Shape {
  static targetClass = sioc.Container;
}
