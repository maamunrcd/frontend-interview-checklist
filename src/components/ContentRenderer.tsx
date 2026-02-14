"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { CodeBlock } from "./CodeBlock";

interface ContentRendererProps {
  content: string;
  slug: string;
  onMarkComplete?: (slug: string) => void;
  isCompleted?: boolean;
  readTimeMinutes?: number;
}

export function ContentRenderer({
  content,
  slug,
  onMarkComplete,
  isCompleted,
  readTimeMinutes,
}: ContentRendererProps) {
  return (
    <article className="mx-auto min-h-full max-w-3xl bg-[var(--surface)] px-4 py-6 text-[var(--foreground)] sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        {onMarkComplete && (
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={!!isCompleted}
              onChange={() => onMarkComplete(slug)}
              className="h-4 w-4 rounded border-[var(--border)] text-emerald-600 focus:ring-emerald-500"
              aria-label="Mark as complete"
            />
            <span className="text-sm text-[var(--foreground-muted)]">Mark as complete</span>
          </label>
        )}
        {readTimeMinutes != null && readTimeMinutes > 0 && (
          <span className="text-sm text-[var(--foreground-muted)]">
            ~{readTimeMinutes} min read
          </span>
        )}
      </div>
      <div className="interview-prose prose prose-neutral max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
          ]}
          components={{
            h1({ node, ...props }) {
              return (
                <h1
                  className="scroll-mt-20 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl md:scroll-mt-24 md:text-4xl"
                  {...props}
                />
              );
            },
            h2({ node, ...props }) {
              return (
                <h2
                  className="scroll-mt-20 mt-8 border-b border-[var(--border)] pb-2 text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl md:mt-12 md:scroll-mt-24 md:text-3xl"
                  {...props}
                />
              );
            },
            h3({ node, ...props }) {
              return (
                <h3
                  className="scroll-mt-20 mt-6 text-lg font-semibold text-[var(--foreground)] sm:text-xl md:mt-8 md:scroll-mt-24 md:text-2xl"
                  {...props}
                />
              );
            },
            h4({ node, ...props }) {
              return (
                <h4
                  className="interview-question-heading scroll-mt-20 mt-6 border-t border-[var(--border)] pt-4 text-base font-medium text-[var(--foreground)] sm:mt-8 sm:pt-6 sm:text-lg md:scroll-mt-24 md:text-xl"
                  {...props}
                />
              );
            },
            code({ node, className, children, ...props }) {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 text-sm border border-[var(--border)]" {...props}>
                    {children}
                  </code>
                );
              }
              return (
                <CodeBlock className={className} node={node}>
                  {String(children).replace(/\n$/, "")}
                </CodeBlock>
              );
            },
            p({ node, ...props }) {
              return <p className="my-3 leading-7 text-[var(--foreground-muted)]" {...props} />;
            },
            hr({ node, ...props }) {
              return <hr className="my-8 border-[var(--border)]" {...props} />;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
