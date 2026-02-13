"use client";

import { ContentRenderer } from "./ContentRenderer";
import { useProgress } from "@/lib/progress";

interface ContentWithProgressProps {
  content: string;
  slug: string;
  readTimeMinutes: number;
}

export function ContentWithProgress({ content, slug, readTimeMinutes }: ContentWithProgressProps) {
  const { completedIds, toggleComplete } = useProgress();
  const isCompleted = completedIds.has(slug);

  return (
    <ContentRenderer
      content={content}
      slug={slug}
      onMarkComplete={toggleComplete}
      isCompleted={isCompleted}
      readTimeMinutes={readTimeMinutes}
    />
  );
}
