"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ScrollSpyProvider, ScrollSpyObserver } from "@/lib/scroll-spy";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setMobile(mq.matches);
    const handler = () => setMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const scrollToHash = () => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const t = setTimeout(scrollToHash, 100);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <ScrollSpyProvider>
      <div className="flex min-h-screen flex-col">
        <Header onMenuClick={mobile ? () => setSidebarOpen(true) : undefined} />
        <div className="flex flex-1">
          <Sidebar
            open={mobile ? sidebarOpen : true}
            onClose={mobile ? () => setSidebarOpen(false) : undefined}
            mobile={mobile}
          />
          <main className="min-w-0 flex-1 overflow-auto">
            {children}
            <ScrollSpyObserver />
          </main>
        </div>
      </div>
    </ScrollSpyProvider>
  );
}
