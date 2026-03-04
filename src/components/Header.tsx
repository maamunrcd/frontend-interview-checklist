"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useProgress } from "@/lib/progress";
import { Logo } from "@/components/Logo";
import { useEffect, useState } from "react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { progressPercent, totalCount, completedCount } = useProgress();

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl pl-[env(safe-area-inset-left)] transition-all duration-300">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-8">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--foreground-muted)] hover:bg-[var(--border)] transition-colors sm:hidden shadow-sm"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          )}
          <Link
            href="/"
            className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
            aria-label="Frontend Interview Book home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 shadow-inner ring-1 ring-emerald-500/20">
              <Logo className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-[var(--foreground)] leading-none">Frontend 
</span>
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-emerald-600/80 dark:text-emerald-400/80">Interview Guideline</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-4 sm:flex" aria-label="Global Progress">
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[var(--foreground)]">{progressPercent}%</span>
                <span className="text-[0.65rem] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">Completed</span>
              </div>
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-[var(--surface-muted)] ring-1 ring-black/5">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-700 ease-out shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-[var(--border)] pl-4">
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-all duration-300 shadow-sm"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
