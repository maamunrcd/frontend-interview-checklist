"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { CodeBlock } from "./CodeBlock";
import { useProgress } from "@/lib/progress";

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
  const { completedIds, toggleComplete } = useProgress();

  return (
    <article className="mx-auto min-h-full max-w-5xl bg-[var(--surface)] px-4 py-8 text-[var(--foreground)] sm:px-8 sm:py-12 lg:px-12">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
        {onMarkComplete && (
          <label className="flex cursor-pointer items-center gap-3 group">
            <input
              type="checkbox"
              checked={!!isCompleted}
              onChange={() => onMarkComplete(slug)}
              className="custom-checkbox group-hover:ring-4 group-hover:ring-[var(--ring)]"
              aria-label="Mark as complete"
            />
            <span className="text-sm font-medium text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors italic">
              Mark this section as complete
            </span>
          </label>
        )}
        {readTimeMinutes != null && readTimeMinutes > 0 && (
          <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--foreground-muted)] bg-[var(--surface-muted)] px-3 py-1 rounded-full border border-[var(--border)]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ~{readTimeMinutes} min read
          </div>
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
                  className="scroll-mt-20 text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl md:scroll-mt-24 md:text-5xl mb-8"
                  {...props}
                />
              );
            },
            h2({ node, ...props }) {
              return (
                <h2
                  className="scroll-mt-20 mt-12 border-b border-[var(--border)] pb-4 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl md:mt-16 md:scroll-mt-24 md:text-4xl mb-8"
                  {...props}
                />
              );
            },
            h3({ node, ...props }) {
              return (
                <h3
                  className="scroll-mt-20 mt-8 text-xl font-bold text-[var(--foreground)] sm:text-2xl md:mt-10 md:scroll-mt-24 md:text-3xl mb-6"
                  {...props}
                />
              );
            },
            h4({ node, ...props }) {
              return (
                <h4
                  className="interview-question-heading scroll-mt-20 mt-8 border-t border-[var(--border)] pt-6 text-lg font-semibold text-[var(--foreground)] sm:mt-10 sm:pt-8 sm:text-xl md:scroll-mt-24 md:text-2xl mb-4"
                  {...props}
                />
              );
            },
            code({ node, className, children, ...props }) {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="rounded-md bg-[var(--surface-muted)] px-1.5 py-0.5 text-sm font-mono border border-[var(--border)] font-medium text-[var(--accent)]" {...props}>
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
              return <p className="my-4 leading-relaxed text-[var(--foreground-muted)] text-[1.05rem]" {...props} />;
            },
            li({ node, children, className, ...props }) {
              const isTaskList = className?.includes("task-list-item");
              if (isTaskList) {
                // Helper to get all text from nested nodes
                const getTaskText = (n: any): string => {
                  if (n.type === "text") return n.value;
                  if (n.children) return n.children.map(getTaskText).join("");
                  return "";
                };

                const textContent = (node as any).children
                  .filter((c: any) => c.tagName !== "input")
                  .map(getTaskText)
                  .join("")
                  .trim();

                const taskId = `${slug}#${textContent}`;
                const isTaskDone = completedIds.has(taskId);

                // Deep filter to remove initial checkboxes rendered by GFM
                const filterChildren = (children: any): any => {
                  return React.Children.map(children, (child) => {
                    if (child?.type === "input" && child?.props?.type === "checkbox") {
                      return null;
                    }
                    if (child?.props?.children) {
                      return React.cloneElement(child, {
                        ...child.props,
                        children: filterChildren(child.props.children)
                      });
                    }
                    return child;
                  });
                };

                return (
                  <li className="card-item relative mb-4 flex items-start gap-4 p-5 list-none group" {...props}>
                    <div className="flex items-center h-6 mt-1">
                      <input
                        type="checkbox"
                        checked={isTaskDone}
                        onChange={() => toggleComplete(taskId)}
                        className="custom-checkbox group-hover:ring-4 group-hover:ring-[var(--ring)]"
                        aria-label={textContent}
                      />
                    </div>
                    <div className={`flex-1 ${isTaskDone ? "opacity-30 line-through grayscale italic text-[var(--foreground-muted)]" : ""} transition-all duration-300 [&_p]:my-0`}>
                      <div className="text-[1.05rem] font-medium leading-relaxed">
                        {filterChildren(children)}
                      </div>
                    </div>
                  </li>
                );
              }
              return <li className="my-3 ml-6 list-disc text-[var(--foreground-muted)] leading-relaxed" {...props}>{children}</li>;
            },
            hr({ node, ...props }) {
              return <hr className="my-12 border-[var(--border)]" {...props} />;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
