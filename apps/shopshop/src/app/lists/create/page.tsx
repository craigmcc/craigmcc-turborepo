/**
 * Page for creating a new List.
 */

// External Modules ----------------------------------------------------------

import { redirect } from "next/navigation";

// Internal Modules ----------------------------------------------------------

import { ListForm } from "@/components/lists/ListForm";
import { findProfile } from "@/lib/ProfileHelpers";

// Public Objects ------------------------------------------------------------

export default async function ListCreatePage() {

  // AUTHENTICATION - Must be signed in
  const profile = await findProfile();
  if (!profile) {
    redirect("/auth/signIn");
  }

  // AUTHORIZATION - Any signed in user can create a List

  return (
    <div className="flex h-full w-full items-center justify-center">
      <ListForm />
    </div>
  );

}
