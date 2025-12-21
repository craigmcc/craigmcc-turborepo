/**
 * Categories List page for the specified List.
 */

// External Modules ----------------------------------------------------------

import { dbShopShop, Category } from "@repo/db-shopshop/*";
import { ActionResult } from "@repo/shadcn-tanstack-form/ActionResult";
import { ServerResult } from "@repo/shadcn-tanstack-form/ServerResult";
import { redirect } from "next/navigation";

// Internal Modules ----------------------------------------------------------

import { CategoriesTable } from "@/components/categories/CategoriesTable";
import { findProfile } from "@/lib/ProfileHelpers";

// Public Objects ------------------------------------------------------------

type Props = {
  params: Promise<{
    // List ID for which to select Categories
    listId: string,
  }>
}

export default async function CategoriesListPage({ params }: Props) {

  const { listId } = await params;

  // Check authentication
  const profile = await findProfile();
  if (!profile) {
    redirect("/auth/signIn");
  }

  // Check authorization (and existence of List)
  const member = await dbShopShop.member.findFirst({
    include: {
      list: {
        include: {
          categories: true
        },
      },
    },
    where: {
      listId: listId,
      profileId: profile.id,
    }
  });
  if (!member) {
    const result: ActionResult<Category> = {
      message: "You are a Member of this List, so you cannot view the Categories."
    }
    return (
      <ServerResult result={result}/>
    );
  }

  // Display the Categories for this List
  return (
    <CategoriesTable
      categories={member.list.categories}
      list={member.list}
      profile={profile}
    />
  )

}
