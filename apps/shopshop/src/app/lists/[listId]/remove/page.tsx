/**
 * Page for removing an exiting List.
 */

// External Modules ----------------------------------------------------------

import { dbShopShop as db, List, MemberRole } from "@repo/db-shopshop/*";
import { redirect } from "next/navigation";

// Internal Modules ----------------------------------------------------------

import { ListForm } from "@/components/lists/ListForm";
import { findProfile } from "@/lib/ProfileHelpers";
import {ActionResult} from "@repo/shadcn-tanstack-form/ActionResult";
import {ServerResult} from "@repo/shadcn-tanstack-form/ServerResult";


// Public Objects ------------------------------------------------------------

type Props = {
  params: Promise<{
    // ID of the List to be removed
    listId: string;
  }>
}

export default async function ListRemovePage(props: Props) {

  const params = await props.params;
  const listId = params.listId;

  // AUTHENTICATION - Must be signed in
  const profile = await findProfile();
  if (!profile) {
    redirect("/auth/signIn");
  }

  // AUTHORIZATION - Must be an ADMIN member of an existing list
  const member = await db.member.findFirst({
    include: {
      list: true,
    },
    where: {
      listId: listId,
      profileId: profile.id,
    }
  });
  if (!member || !member.list || member.role !== MemberRole.ADMIN) {
    const result:  ActionResult<List> = {
      message: "You are not an ADMIN of ths List, so you cannot remove it."
    }
    return(
      <div className="flex h-full w-full items-center justify-center">
        <ServerResult result={result} />
      </div>
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <ListForm list={member.list} removing={true}/>
    </div>
  );

}
