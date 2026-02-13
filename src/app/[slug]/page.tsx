import { notFound } from "next/navigation";
import { getContentBySlug, getStaticSlugs, estimateReadTime } from "@/lib/content";
import { getEntryBySlug } from "@/lib/menu-config";
import { ContentWithProgress } from "@/components/ContentWithProgress";

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) notFound();

  const content = getContentBySlug(slug);
  if (content == null) notFound();

  const readTimeMinutes = estimateReadTime(content);

  return (
    <ContentWithProgress
      content={content}
      slug={slug}
      readTimeMinutes={readTimeMinutes}
    />
  );
}
