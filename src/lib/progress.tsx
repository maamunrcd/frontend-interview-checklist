"use client";

import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";
import { allSlugs } from "./menu-config";

const STORAGE_KEY = "frontend-interview-progress";

type ProgressContextValue = {
  completedIds: Set<string>;
  toggleComplete: (id: string) => void;
  progressPercent: number;
  totalCount: number;
  completedCount: number;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function loadStored(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveStored(ids: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // ignore
  }
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCompletedIds(loadStored());
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveStored(next);
      return next;
    });
  }, []);

  const totalCount = allSlugs.length;
  const completedCount = useMemo(
    () => allSlugs.filter((slug) => completedIds.has(slug)).length,
    [completedIds]
  );
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const value = useMemo<ProgressContextValue>(
    () => ({
      completedIds,
      toggleComplete,
      progressPercent,
      totalCount,
      completedCount,
    }),
    [completedIds, toggleComplete, progressPercent, totalCount, completedCount]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
