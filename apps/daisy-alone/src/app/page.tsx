/**
 * Home page for the DaisyUI Alone application.
 */

// External Imports ----------------------------------------------------------

import Link from "next/link";

// Internal Imports ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center pt-8 min-h-full">
      <h1 className="text-4xl text-primary pb-8">Welcome to DaisyUI Alone</h1>
      <p className="text-2xl text-secondary pb-8">
        This is a standalone application showcasing DaisyUI components with Next.js.
      </p>
      <p className="text-2xl text-info">
        Learn more about <Link className="link" href="https://daisyui.com">Daisy UI</Link> here.
      </p>

    </div>
  );
}
