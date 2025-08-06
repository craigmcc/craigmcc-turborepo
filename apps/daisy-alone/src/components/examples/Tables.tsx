/**
 * Tables example component.
 */

// External Modules ----------------------------------------------------------

// Internal Modules ----------------------------------------------------------

import { BasicTable } from "@/components/tables/BasicTable";
import { TanstackTable } from "@/components/tables/TanstackTable";
import users from "@/data/users.json"

// Public Objects ------------------------------------------------------------

export function Tables() {

  return (
    <div className="flex gap-8 justify-center w-full">
      <BasicTable users={users}/>
      <TanstackTable users={users}/>
    </div>
  );
}
