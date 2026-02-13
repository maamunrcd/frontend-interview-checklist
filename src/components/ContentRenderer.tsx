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
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 min-h-full bg-[var(--surface)] text-[var(--foreground)]">
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
                  className="scroll-mt-24 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl"
                  {...props}
                />
              );
            },
            h2({ node, ...props }) {
              return (
                <h2
                  className="scroll-mt-24 mt-10 border-b border-[var(--border)] pb-2 text-2xl font-semibold tracking-tight text-[var(--foreground)] md:mt-12 md:text-3xl"
                  {...props}
                />
              );
            },
            h3({ node, ...props }) {
              return (
                <h3
                  className="scroll-mt-24 mt-8 text-xl font-semibold text-[var(--foreground)] md:text-2xl"
                  {...props}
                />
              );
            },
            h4({ node, ...props }) {
              return (
                <h4
                  className="interview-question-heading scroll-mt-24 mt-10 border-t border-[var(--border)] pt-6 text-lg font-medium text-[var(--foreground)] md:text-xl"
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
