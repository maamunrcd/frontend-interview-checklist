import Link from "next/link";
import { getFirstSlug } from "@/lib/menu-config";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Page not found
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400">
        The section you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        href={`/${getFirstSlug()}`}
        className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Start reading
      </Link>
    </div>
  );
}
