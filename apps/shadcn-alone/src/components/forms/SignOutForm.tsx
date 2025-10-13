"use client";

/**
 * Form for the Sign Out page.
 */

// External Modules ----------------------------------------------------------

import { Button } from "@repo/shadcn-ui/components/button";
import {
  Card,
//  CardAction,
  CardContent,
  CardDescription,
//  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/components/card";
import { ServerResult } from "@repo/shadcn-tanstack-form/ServerResult";
import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
import { Result } from "@repo/shared-utils/Result";
import { LoaderCircle } from "lucide-react";
//import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

// Internal Modules ----------------------------------------------------------

import { doSignOutAction } from "@/actions/AuthActions";
import { useCurrentProfileContext } from "@/contexts/CurrentProfileContext";
import { Profile } from "@/types/types";

//const isTesting = process.env.NODE_ENV === "test";

// Public Objects ------------------------------------------------------------

export function SignOutForm() {

//  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [result, setResult] = useState<Result<Profile> | null>(null);
  const { setCurrentProfile } = useCurrentProfileContext();

  async function performSignOut() {

    logger.trace({
      context: "SignOutForm.performSignOut.input",
      message: "Performing sign out",
    })

    try {

      setIsSigningOut(true);
      await doSignOutAction();
      logger.trace({
        context: "SignOutForm.submitForm.success",
        message: "Sign out successful",
      });
      setIsSigningOut(false);
      setCurrentProfile(null);

      toast.success("Sign out successful");

    } catch (error) {

      setIsSigningOut(false);
      logger.trace({
        context: "SignOutForm.submitForm.error",
        error,
      });
      setResult({message: (error as Error).message})

    }

  }

  return (
    <Card className="w-96 bg-secondary text-secondary-foreground border-2 rounded-2xl">
      <CardHeader>
        <CardTitle className="w-full text-center">Sign Out</CardTitle>
        <CardDescription className="w-full text-center">
          Are you sure you want to sign out?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ServerResult result={result}/>
        <div className="flex flex-row justify-center">
          <Button
            className="justify-center"
            disabled={isSigningOut}
            onClick={performSignOut}
          >
            {isSigningOut ? (
              <>
                <LoaderCircle className="animate-spin"/>Signing Out
              </>
            ): "Sign Out" }
          </Button>
        </div>
      </CardContent>
    </Card>
  )

}
