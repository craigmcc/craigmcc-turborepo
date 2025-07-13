/**
 * Home page for the ShopShop application.
 */

// External Imports ----------------------------------------------------------

// Internal Imports ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center pt-8 min-h-full">
      <h1 className="text-4xl text-primary pb-8">Welcome to ShopShop</h1>
      <p className="text-2xl text-secondary pb-8">
        This is an online shopping application.
      </p>
    </div>
  );
}
