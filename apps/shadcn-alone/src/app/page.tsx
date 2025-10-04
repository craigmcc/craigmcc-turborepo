/**
 * Home page for the ShadCN-UI Alone application.
 */

// External Imports ----------------------------------------------------------

import Link from "next/link";

// Internal Imports ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 h-full">
      <h1 className="text-4xl text-primary pb-8">Welcome to ShadCN Alone</h1>
      <p className="text-2xl text-secondary pb-8">
        This is a standalone application showcasing ShadCN components with Next.js.
      </p>
      <p className="text-2xl text-info">
        Learn more about&nbsp;
        <Link className="underline" href="https://ui.shadcn.com">ShadCN</Link>
        &nbsp;here.
      </p>

    </div>
  );
}
