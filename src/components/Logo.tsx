"use client";

/**
 * Logo: open book with code brackets </> — Frontend Interview Book.
 * Uses currentColor so it adapts to light/dark theme.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Left page */}
      <path
        d="M6 8v16c0 1.5 1.5 2 3 2h4V6H9c-1.5 0-3 1.5-3 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Right page */}
      <path
        d="M26 8v16c0 1.5-1.5 2-3 2h-4V6h4c1.5 0 3 1.5 3 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Spine */}
      <path
        d="M13 6v20"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      {/* </> on spread */}
      <path
        d="M16 11h2M15 16l2.5 2.5L20 16M22 16l-2.5 2.5L17 16"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
