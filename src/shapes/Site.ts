import { linkedShape } from '../package.js';
import { Space } from './Space.js';
import * as sioc from '../ontologies/sioc.js';

@linkedShape
export class Site extends Space {
  static targetClass = sioc.Site;
}
