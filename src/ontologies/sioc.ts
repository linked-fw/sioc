import { Prefix } from '@_linked/core/utils/Prefix';
import { createNameSpace } from '@_linked/core/utils/NameSpace';
import { loadOntologyFiles } from '@_linked/core/ontology/loadOntologyFiles';

/** The package's ontology data, relative to this module (Turtle, copied into `lib/` by the build). */
export const dataFiles = ['../data/sioc.ttl', '../data/sioc-types.ttl'];

/** Reads the package's ontology data (server only). */
export const loadData = () => loadOntologyFiles(import.meta.url, dataFiles);

const base = 'http://rdfs.org/sioc/ns#';
export var ns = createNameSpace(base);
Prefix.add('sioc', base);

export var _self = ns('');
export var Container = ns('Container');
export var Item = ns('Item');
export var Role = ns('Role');
export var Site = ns('Site');
export var Space = ns('Space');
export var UserAccount = ns('UserAccount');
export var Usergroup = ns('Usergroup');

export var about = ns('about');
export var account_of = ns('account_of');
export var avatar = ns('avatar');
export var email = ns('email');
export var has_creator = ns('has_creator');
export var has_function = ns('has_function');
export var has_member = ns('has_member');
export var has_scope = ns('has_scope');
export var has_usergroup = ns('has_usergroup');
export var id = ns('id');
export var links_to = ns('links_to');
export var member_of = ns('member_of');
export var name = ns('name');
export var usergroup_of = ns('usergroup_of');
export var has_owner = ns('has_owner');

export const sioc = {
  Container,
  Item,
  Role,
  Site,
  Space,
  UserAccount,
  Usergroup,

  about,
  account_of,
  avatar,
  email,
  has_creator,
  has_function,
  has_member,
  has_owner,
  has_scope,
  has_usergroup,
  id,
  links_to,
  member_of,
  name,
  usergroup_of,
};

