import { Shape } from '@_linked/core/shapes/Shape';
import { linkedShape } from '../package.js';
import * as sioc from '../ontologies/sioc.js';
import { UserAccount } from './UserAccount.js';
import { objectProperty } from '@_linked/core/shapes/SHACL';

@linkedShape
export class Item extends Shape {
  static targetClass = sioc.Item;

  @objectProperty({
    path: sioc.about,
    shape: Shape,
    maxCount: 1,
  })
  get about(): Shape {
    return undefined as any;
  }

  @objectProperty({
    path: sioc.has_creator,
    shape: UserAccount,
    maxCount: 1,
  })
  get creator(): UserAccount {
    return undefined as any;
  }

  //sioc:addressed_to
  //sioc:attachment
  //sioc:content
  //sioc:delivered_at
  //sioc:earlier_version
  //sioc:embeds_knowledge
  //sioc:generator
  //sioc:has_container
  //sioc:has_discussion
  //sioc:has_reply
  //sioc:later_version
  //sioc:latest_version
  //sioc:mentions
  //sioc:next_by_date
  //sioc:next_version
  //sioc:previous_by_date
  //sioc:previous_version
  //sioc:read_at
  //sioc:reply_of
  //sioc:respond_to
  //sioc:shared_by
  //sioc:sibling
}
