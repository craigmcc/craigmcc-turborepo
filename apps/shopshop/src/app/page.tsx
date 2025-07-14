/**
 * Home page for the ShopShop application.
 */

// External Imports ----------------------------------------------------------

import Link from "next/link";

// Internal Imports ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center pt-8 min-h-full">
      <h1 className="text-4xl text-primary pb-8">Welcome to ShopShop</h1>
      <p className="text-2xl text-secondary pb-8">
        Your electronic shopping list.
      </p>
      <div className="flex flex-row justify-center text-center gap-6">
        <button className="btn btn-info">
          <Link className="flex flex-row gap-2" href="/auth/signUp">
            {/*<GitBranchPlus />*/}
            <span>Sign Up</span>
          </Link>
        </button>
        <button className="btn btn-primary">
          <Link className="flex flex-row gap-2" href="/auth/signIn">
            {/*<Key />*/}
            <span>Sign In</span>
          </Link>
        </button>
      </div>
    </div>
  );
}
