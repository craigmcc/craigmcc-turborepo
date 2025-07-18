/**
 * Extended model types for the ShopShop application.
 */

// External Modules ----------------------------------------------------------

import {
  Category,
  Item,
  List,
  Member,
  Profile,
} from "@repo/db-shopshop/dist";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export type CategoryPlus = Category & {
  items?: ItemPlus[];
  list?: List;
}

export type ItemPlus = Item & {
  category?: CategoryPlus;
  list?: ListPlus;
}

export type ListPlus = List & {
  categories?: CategoryPlus[];
  members?: MemberPlus[];
}

export type MemberPlus = Member & {
  profile?: ProfilePlus;
  list?: ListPlus;
}

export type ProfilePlus = Profile & {
  lists?: ListPlus[];
  members?: MemberPlus[];
}
