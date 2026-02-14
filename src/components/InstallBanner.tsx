"use client";

import { useState, useEffect } from "react";

const DISMISS_KEY = "pwa-install-dismissed";

export function InstallBanner() {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<{ prompt: () => Promise<{ outcome: string }> } | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const standalone = window.matchMedia("(display-mode: standalone)").matches
      || (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(standalone);
    if (standalone) return;

    const dismissed = sessionStorage.getItem(DISMISS_KEY);
    if (dismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt({ prompt: () => (e as { prompt: () => Promise<{ outcome: string }> }).prompt() });
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS && "serviceWorker" in navigator) setShow(true);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
      } catch {
        // ignore
      }
      setDeferredPrompt(null);
    }
    setShow(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  if (!show || isStandalone) return null;

  const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div
      role="banner"
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-3 border-t border-(--border) bg-(--surface) px-4 py-3 shadow-lg safe-area-pb"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <span className="text-sm text-(--foreground-muted)">
        {isIOS ? "Add to Home Screen for quick access" : "Install the app for offline use"}
      </span>
      <div className="flex shrink-0 items-center gap-2">
        {deferredPrompt && (
          <button
            type="button"
            onClick={handleInstall}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Install
          </button>
        )}
        <button
          type="button"
          onClick={handleDismiss}
          className="rounded px-2 py-1 text-sm text-(--foreground-muted) hover:text-foreground"
          aria-label="Dismiss"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
