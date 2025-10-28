"use client";

/**
 * Form for the Sign Out page.
 */

// External Modules ----------------------------------------------------------

import { ActionResult } from "@repo/daisy-tanstack-form/ActionResult";
import { ServerResult } from "@repo/daisy-tanstack-form/ServerResult";
import { Profile } from "@repo/db-shopshop/dist";
import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

// Internal Modules ----------------------------------------------------------

import { doSignOutAction } from "@/actions/AuthActions";

//const isTesting = process.env.NODE_ENV === "test";

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

    try {

      setIsSigningOut(true);
      await doSignOutAction();
      logger.trace({
        context: "SignOutForm.submitForm.success",
        message: "Sign out successful",
      });

      toast.success("Sign out successful");
      router.push("/"); // TODO redirect to home page or login page

    } catch (error) {

      logger.trace({
        context: "SignOutForm.submitForm.error",
        error,
      });
      setResult({message: (error as Error).message})

    } finally {

      setIsSigningOut(false);

    }

  }

  return (
    <div className="card bg-info/50 border-2 rounded-2xl w-96">
      <div className="card-body">
        <h2 className="card-title justify-center">
          <p>Sign Out</p>
        </h2>
        <ServerResult result={result}/>
        <p>Are you sure you want to sign out?</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary justify-center gap-2"
            onClick={performSignOut}
            type="button"
          >
            {isSigningOut ? (
              <>
                <LoaderCircle className="animate-spin"/>Signing Out
              </>
            ): "Sign Out" }
          </button>
        </div>
      </div>

    </div>
  )

}
