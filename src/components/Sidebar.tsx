"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuSections } from "@/lib/menu-config";
import { useProgress } from "@/lib/progress";
import { useScrollSpy } from "@/lib/scroll-spy";
import { useState, useEffect } from "react";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
  mobile?: boolean;
}

export function Sidebar({ open = true, onClose, mobile = false }: SidebarProps) {
  const pathname = usePathname();
  const currentSlug = pathname === "/" ? null : pathname.replace(/^\//, "").split("#")[0];
  const { completedIds } = useProgress();
  const { activeAnchor: scrollSpyAnchor } = useScrollSpy() ?? { activeAnchor: "" };
  const [openSections, setOpenSections] = useState<Record<number, boolean>>(() =>
    menuSections.reduce((acc, _, i) => ({ ...acc, [i]: true }), {} as Record<number, boolean>)
  );
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    setCurrentHash(typeof window !== "undefined" ? window.location.hash.slice(1) : "");
  }, [pathname]);
  useEffect(() => {
    const onHashChange = () => setCurrentHash(window.location.hash.slice(1));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  useEffect(() => {
    if (mobile && open && onClose) onClose();
  }, [pathname]);

  const effectiveAnchor = scrollSpyAnchor || currentHash;

  const toggleSection = (i: number) => {
    setOpenSections((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const aside = (
    <aside
      className={`flex w-64 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface-muted)] ${
        mobile
          ? "fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] transform transition-transform duration-200 ease-out"
          : "sticky top-14 h-[calc(100vh-3.5rem)]"
      } ${mobile && !open ? "-translate-x-full" : ""}`}
      aria-label="Book navigation"
    >
      <nav className="flex-1 overflow-y-auto py-4" aria-label="Book menu">
        <ul className="space-y-1 px-2">
          {menuSections.map((section, sectionIndex) => {
            const isOpen = openSections[sectionIndex] ?? true;
            const sectionCompleted = section.entries.some((e) => completedIds.has(e.slug));
            return (
              <li key={section.title}>
                <button
                  type="button"
                  onClick={() => toggleSection(sectionIndex)}
                  className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-[var(--foreground)]"
                  aria-expanded={isOpen}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    {sectionCompleted && (
                      <span className="text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden>✓</span>
                    )}
                    <span className="truncate">{section.title}</span>
                  </span>
                  <svg
                    className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <ul className="mt-1 space-y-0.5 pl-2">
                    {section.entries.map((entry) => {
                      const hasSubItems = entry.subItems && entry.subItems.length > 0;
                      const isPageActive = entry.slug === currentSlug;
                      const isCompleted = completedIds.has(entry.slug);

                      if (hasSubItems) {
                        return (
                          <li key={entry.slug} className="space-y-0.5">
                            <ul className="space-y-0.5 border-l border-[var(--border)] pl-3">
                              {entry.subItems!.map((sub) => {
                                const href = `/${entry.slug}#${sub.anchor}`;
                                const isSubActive = isPageActive && effectiveAnchor === sub.anchor;
                                const isPageActiveNoHash = isPageActive && !effectiveAnchor;
                                const isActive = isSubActive || (isPageActiveNoHash && sub.anchor === entry.subItems![0].anchor);
                                return (
                                  <li key={sub.anchor}>
                                    <Link
                                      href={href}
                                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${
                                        isActive
                                          ? "font-medium text-[var(--foreground)] bg-[var(--surface)]"
                                          : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                                      }`}
                                    >
                                      <span className="truncate">{sub.title}</span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        );
                      }

                      const isActive = entry.slug === currentSlug;
                      return (
                        <li key={entry.slug}>
                          <Link
                            href={`/${entry.slug}`}
                            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                              isActive
                                ? "bg-[var(--surface)] font-medium text-[var(--foreground)]"
                                : "text-[var(--foreground-muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                            }`}
                          >
                            {isCompleted && (
                              <span className="text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden>✓</span>
                            )}
                            <span className="truncate">{entry.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );

  if (mobile) {
    return (
      <>
        {open && (
          <div
            className="fixed inset-0 top-14 z-30 bg-black/50"
            onClick={onClose}
            onKeyDown={(e) => e.key === "Escape" && onClose?.()}
            role="button"
            tabIndex={0}
            aria-label="Close menu"
          />
        )}
        {aside}
      </>
    );
  }
  return aside;
}
