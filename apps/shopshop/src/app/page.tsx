/**
 * Home page for the ShopShop application.
 */

// External Imports ----------------------------------------------------------

import { Button } from "@repo/shadcn-ui/components/button";
import Link from "next/link";

// Internal Imports ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center pt-8 h-full">
      <h1 className="text-4xl text-primary pb-8">Welcome to ShopShop</h1>
      <p className="text-2xl text-secondary pb-8">
        Your electronic shopping list.
      </p>
      <div className="flex flex-row justify-center text-center gap-6">
        <Button variant="secondary" asChild>
          <Link href="/auth/signUp">Sign Up</Link>
        </Button>
        <Button variant="default" asChild>
          <Link href="/auth/signIn">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
