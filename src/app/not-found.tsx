import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="script-accent text-3xl">Oops</p>
        <h1 className="mt-3 text-4xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full bg-brand px-6 text-sm font-medium text-brand-foreground"
          >
            Go home
          </Link>
          <Link
            href="/services"
            className="inline-flex h-11 items-center rounded-full border border-ink/25 px-6 text-sm font-medium"
          >
            Browse services
          </Link>
        </div>
      </div>
    </div>
  );
}
