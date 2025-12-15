/**
 * Avatar (either image or initials) for a Profile.
 */

// External Modules ----------------------------------------------------------

import { Profile } from "@repo/db-shopshop/dist";
import Image from "next/image";

// Internal Modules ----------------------------------------------------------

import { initials } from "@/lib/Strings";

// Public Objects ------------------------------------------------------------

type Props = {
  // Profile for which to create an avatar
  profile: Profile;
}

export function ProfileAvatar({ profile }: Props) {

  return (
    <div className="group relative mx-3 flex h-12 w-12 items-center overflow-hidden rounded-2xl transition-all group-hover:rounded-2xl">
      {profile.imageUrl ? (
        <Image alt={`Profile '{profile.name}'`} fill src={profile.imageUrl} />
      ) : (
        <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-3xl bg-base-300 text-xs transition-all group-hover:rounded-2xl group-hover:bg-accent">
          <span className="accent">{initials(profile.name)}</span>
        </span>
      )}
    </div>
  );

}
