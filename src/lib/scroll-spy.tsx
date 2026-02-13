"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type ScrollSpyContextValue = {
  activeAnchor: string;
  setActiveAnchor: (id: string) => void;
};

const ScrollSpyContext = createContext<ScrollSpyContextValue | null>(null);

export function useScrollSpy() {
  const ctx = useContext(ScrollSpyContext);
  return ctx;
}

export function ScrollSpyProvider({ children }: { children: ReactNode }) {
  const [activeAnchor, setActiveAnchor] = useState("");
  return (
    <ScrollSpyContext.Provider value={{ activeAnchor, setActiveAnchor }}>
      {children}
    </ScrollSpyContext.Provider>
  );
}

/** Observes headings inside main and updates context with the id in view. */
export function ScrollSpyObserver() {
  const pathname = usePathname();
  const { setActiveAnchor } = useScrollSpy() ?? { setActiveAnchor: () => {} };
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!setActiveAnchor) return;

    const timeoutId = setTimeout(() => {
      const main = document.querySelector("main");
      if (!main) return;

      const article = main.querySelector("article");
      if (!article) return;

      const headings = article.querySelectorAll<HTMLElement>("h2[id], h3[id], h4[id]");
      if (headings.length === 0) {
        setActiveAnchor("");
        return;
      }

      observerRef.current?.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((e) => e.isIntersecting);
          if (visible.length === 0) return;

          const byTop = [...visible].sort(
            (a, b) =>
              (a.boundingClientRect?.top ?? 0) - (b.boundingClientRect?.top ?? 0)
          );
          const topmost = byTop[0];
          const id = topmost?.target?.id;
          if (id) setActiveAnchor(id);
        },
        {
          root: main,
          rootMargin: "-80px 0px -70% 0px",
          threshold: 0,
        }
      );

      headings.forEach((el) => observerRef.current!.observe(el));
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [pathname, setActiveAnchor]);

  return null;
}
