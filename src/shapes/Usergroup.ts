import { Shape } from '@_linked/core/shapes/Shape';
import { objectProperty } from '@_linked/core/shapes/SHACL';
import { linkedShape, packageName } from '../package.js';
import * as sioc from '../ontologies/sioc.js';
// Space, Usergroup and UserAccount reference each other, so they name each other
// by [package, name] (a class reference would read a binding that is not yet
// initialised when the cycle is entered from the other side) and import each
// other for the side effect: naming a shape does not register it, and a query
// that traverses to an unregistered shape throws "Shape class not found".
import './UserAccount.js';
import './Space.js';
@linkedShape
export class Usergroup extends Shape {
  static targetClass = sioc.Usergroup;

  @objectProperty({
    path: sioc.has_member,
    shape: [packageName, 'UserAccount'],
  })
  get members(): any[] {
    return [];
  }

  @objectProperty({
    path: sioc.usergroup_of,
    shape: [packageName, 'Space'],
  })
  get spaces(): any[] {
    return [];
  }
}
