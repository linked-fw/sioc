import type { NodeReferenceValue } from '@_linked/core/utils/NodeReference';
import { literalProperty, objectProperty } from '@_linked/core/shapes/SHACL';
import { Shape } from '@_linked/core/shapes/Shape';
import { linkedShape, packageName } from '../package.js';
import * as sioc from '../ontologies/sioc.js';
import { Person as SchemaPerson } from '@_linked/schema/shapes/Person';
import type { Usergroup } from './Usergroup.js';
import type { Space } from './Space.js';
// Space, Usergroup and UserAccount reference each other, so they name each other
// by [package, name] (a class reference would read a binding that is not yet
// initialised when the cycle is entered from the other side) and import each
// other for the side effect: naming a shape does not register it, and a query
// that traverses to an unregistered shape throws "Shape class not found".
import './Usergroup.js';
import './Space.js';
import { Role } from './Role.js';
import { Container } from './Container.js';

@linkedShape
export class UserAccount extends Shape {
  static targetClass = sioc.UserAccount;

  @objectProperty({
    path: sioc.has_function,
    shape: Role,
  })
  get functions(): Role[] {
    return [];
  }

  @objectProperty({
    path: sioc.has_scope,
    shape: [packageName, 'Space'],
  })
  get scopes(): Array<Space | Container> {
    return [];
  }

  @literalProperty({
    path: sioc.email,
    required: false,
    maxCount: 1,
  })
  get email(): string {
    return '';
  }

  @literalProperty({
    path: sioc.id,
    maxCount: 1,
  })
  get identifier(): string | number {
    return '';
  }

  @literalProperty({
    path: sioc.name,
    maxCount: 1,
  })
  /**
   * returns the name associated with the user account, a.k.a. the "user name"
   * this does NOT have to match with the real name of the person whose account this is
   */
  get name(): string {
    return '';
  }

  @literalProperty({
    path: sioc.avatar,
    maxCount: 1,
  })
  get avatar(): string {
    return '';
  }

  @objectProperty({
    path: sioc.account_of,
    shape: SchemaPerson,
    maxCount: 1,
  })
  get accountOf(): SchemaPerson {
    return undefined as any;
  }

  get accountOfNode(): NodeReferenceValue {
    return undefined as any;
  }

  @objectProperty({
    path: sioc.member_of,
    shape: [packageName, 'Usergroup'],
  })
  get userGroups(): Usergroup[] {
    return [];
  }

  @literalProperty({
    path: sioc.has_owner,
  })
  get owner(): string {
    return '';
  }

  static getAccountOf<T extends UserAccount = UserAccount>(_person: unknown): T {
    // Parameter type was `foaf:Person` before plan-011 phase 4 (the
    // legacy foaf dep was dropped from @_linked/sioc). The body still
    // throws — when this is actually migrated, retype the parameter to
    // `SchemaPerson` (or whatever the new Person abstraction is).
    throw new Error(
      'UserAccount.getAccountOf(...) depends on legacy inverse traversal and has not been migrated yet.'
    );
  }
}
