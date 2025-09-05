/**
 * Global page for categories.  If this Profile is a Member of at least one List,
 * redirect to the Categories page for the first List (alphabetically).  Otherwise,
 * redirect to the Lists page.
 */

// External Imports ----------------------------------------------------------

import { dbShopShop } from "@repo/db-shopshop/*";
// import { serverLogger as logger } from "@repo/shared-utils/ServerLogger";
import { redirect } from "next/navigation";

// Internal Imports ----------------------------------------------------------

import { findProfile } from "@/lib/ProfileHelpers";

// Public Objects ------------------------------------------------------------

export default async function CategoriesPage() {

  const profile = await findProfile();
  if (!profile) {
    redirect("/auth/signIn");
  }

  const member = await dbShopShop.member.findFirst({
    include: {
      list: true,
    },
    orderBy: [
      { list: { name: "asc" } },
    ],
    where: {
      profileId: profile.id,
    },
  });
  if (member) {
    redirect(`/categories/${member.list.id}`);
  } else {
    redirect("/lists");
  }

}
