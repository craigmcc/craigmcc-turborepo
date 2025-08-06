/**
 * Lists page for the lists belonging to the currently signed in profile.
 */

// External Imports ----------------------------------------------------------

import { dbShopShop } from "@repo/db-shopshop/*";
import { redirect } from "next/navigation";

// Internal Imports ----------------------------------------------------------

import { ListsTable } from "@/components/lists/ListsTable";
import { findProfile } from "@/lib/ProfileHelpers";
import { ListPlus } from "@/types/Types";

// Public Objects ------------------------------------------------------------

export default async function ListsPage() {

  const profile = await findProfile();
  if (!profile) {
    redirect("/auth/signIn");
  }

  const members = await dbShopShop.member.findMany({
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

  const allLists: ListPlus[] = [];
  members.map((member) => { allLists.push(member.list); });

  return (
    <div className="flex flex-col items-center justify-center pt-8 min-h-full">
      <h1 className="text-4xl text-primary pb-8">Your Shopping Lists</h1>
      <ListsTable allLists={allLists} profile={profile} />
    </div>
  )

}
