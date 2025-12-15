"use client";

/**
 * Form for the Sign Out page.
 */

// External Modules ----------------------------------------------------------

import { Profile } from "@repo/db-shopshop/dist";
import { ActionResult } from "@repo/shadcn-tanstack-form/ActionResult";
import { ServerResult } from "@repo/shadcn-tanstack-form/ServerResult";
import { Button } from "@repo/shadcn-ui/components/button"
import {
  Card,
//  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/components/card";
import { Spinner } from "@repo/shadcn-ui/components/Spinner";
import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Internal Modules ----------------------------------------------------------

import { doSignOutAction } from "@/actions/AuthActions";

// Public Objects ------------------------------------------------------------

export function SignOutForm() {

  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [result, setResult] = useState<ActionResult<Profile> | null>(null);

  async function performSignOut() {

    logger.trace({
      context: "SignOutForm.performSignOut.input",
      message: "Performing sign out",
    })

    setIsSigningOut(true);
    await doSignOutAction();
    logger.trace({
      context: "SignOutForm.submitForm.success",
      message: "Sign out successful",
    });

    toast.success("Sign out successful");
    setIsSigningOut(false);
    router.push("/"); // TODO redirect to home page or login page

  }

  return (
    <Card className="w-md bg-secondary text-secondary-foreground border-2 rounded-2xl">
      <CardHeader>
        <CardTitle className="w-full text-center">Sign Out</CardTitle>
        <CardDescription className="text-center">
          Are you sure want to sign out?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ServerResult result={result}/>
      </CardContent>
      <CardFooter>
        <div className="w-full flex flex-row justify-center pt-2 gap-4">
          <Button
            className="w-32"
            variant="destructive"
            onClick={performSignOut}
            type="button"
            disabled={isSigningOut}
          >
            {isSigningOut ? (
              <>
                <Spinner className="mr-2"/>Signing Out
              </>
            ): "Sign Out" }
          </Button>
        </div>
      </CardFooter>
    </Card>
  )

}
