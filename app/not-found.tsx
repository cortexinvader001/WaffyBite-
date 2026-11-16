import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-[var(--gut)] text-center">
      <div>
        <p className="eyebrow">Page not found</p>
        <h1 className="h2 mt-4">This plate is not on the menu</h1>
        <Link href="/" className="btn-fill mt-8">
          Back to WaffyBite Express
        </Link>
      </div>
    </main>
  );
}
