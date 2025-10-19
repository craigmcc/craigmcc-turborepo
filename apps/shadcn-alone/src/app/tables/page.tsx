/**
 * Tables page.
 */

// External Imports ----------------------------------------------------------

import {
  Card,
//  CardAction,
  CardContent,
//  CardDescription,
//  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/components/card";

// Internal Imports ----------------------------------------------------------

import { TanstackTable } from "@/components/examples/TanstackTable";
import users from "@/data/users.json";

// Public Objects ------------------------------------------------------------

export default function TanstackTablePage() {
  return (
    <div className="w-full flex justify-center mt-2">
    <Card className="w-[1200px] bg-secondary text-secondary-foreground border-2 rounded-2xl">
      <CardHeader>
        <CardTitle className="w-full text-center font-semibold">Tanstack Table</CardTitle>
      </CardHeader>
      <CardContent>
        <TanstackTable users={users}/>
      </CardContent>
    </Card>
    </div>
  );
}
