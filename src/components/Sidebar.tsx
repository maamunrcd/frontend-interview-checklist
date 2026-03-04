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
      className={`flex shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface-muted)]/50 backdrop-blur-xl ${
        mobile
          ? "fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-[min(20rem,85vw)] transform transition-transform duration-300 ease-in-out shadow-2xl"
          : "sticky top-14 h-[calc(100vh-3.5rem)] w-72"
      } ${mobile && !open ? "-translate-x-full" : ""}`}
      aria-label="Book navigation"
    >
      <nav className="flex-1 overflow-y-auto py-6 px-4" aria-label="Book menu">
        <ul className="space-y-4">
          {menuSections.map((section, sectionIndex) => {
            const isOpen = openSections[sectionIndex] ?? true;
            const entriesCount = section.entries.length;
            const completedInSection = section.entries.filter((e) => completedIds.has(e.slug)).length;
            const sectionCompleted = completedInSection === entriesCount && entriesCount > 0;
            
            return (
              <li key={section.title} className="space-y-2">
                <button
                  type="button"
                  onClick={() => toggleSection(sectionIndex)}
                  className="flex w-full items-center justify-between group py-1"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${sectionCompleted ? "bg-emerald-500 shadow-sm shadow-emerald-500/50" : "bg-[var(--border)] group-hover:bg-[var(--accent)]"}`} />
                    <span className="text-[0.65rem] uppercase tracking-widest font-bold text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors">
                      {section.title}
                    </span>
                  </div>
                  <svg
                    className={`h-3 w-3 text-[var(--foreground-muted)] transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {isOpen && (
                  <ul className="space-y-1">
                    {section.entries.map((entry) => {
                      const hasSubItems = entry.subItems && entry.subItems.length > 0;
                      const isPageActive = entry.slug === currentSlug;
                      const isCompleted = completedIds.has(entry.slug);

                      if (hasSubItems) {
                        return (
                          <li key={entry.slug} className="space-y-1">
                            <div className={`px-3 py-1.5 text-xs font-semibold ${isPageActive ? "text-[var(--accent)]" : "text-[var(--foreground-muted)]"}`}>
                              {entry.title}
                            </div>
                            <ul className="space-y-0.5 border-l-2 border-[var(--border)] ml-3.5 pl-4">
                              {entry.subItems!.map((sub) => {
                                const href = `/${entry.slug}#${sub.anchor}`;
                                const isSubActive = isPageActive && effectiveAnchor === sub.anchor;
                                const isPageActiveNoHash = isPageActive && !effectiveAnchor;
                                const isActive = isSubActive || (isPageActiveNoHash && sub.anchor === entry.subItems![0].anchor);
                                return (
                                  <li key={sub.anchor}>
                                    <Link
                                      href={href}
                                      className={`block py-1.5 px-2 rounded-md text-sm transition-all duration-200 ${
                                        isActive
                                          ? "text-[var(--foreground)] font-medium bg-[var(--surface)] shadow-sm"
                                          : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]/50"
                                      }`}
                                    >
                                      {sub.title}
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
                            className={`flex items-center justify-between group px-3 py-2.5 rounded-xl transition-all duration-300 ${
                              isActive
                                ? "bg-[var(--surface)] shadow-md shadow-black/5 ring-1 ring-black/5 text-[var(--foreground)]"
                                : "text-[var(--foreground-muted)] hover:bg-[var(--surface)]/60 hover:text-[var(--foreground)] transform hover:translate-x-1"
                            }`}
                          >
                            <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                              {entry.title}
                            </span>
                            {isCompleted && (
                              <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
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
            className="fixed inset-0 top-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
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
