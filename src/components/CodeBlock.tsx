"use client";

import { useCallback, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  className?: string;
  children?: string;
  node?: unknown;
}

export function CodeBlock({ className, children, node }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const code = typeof children === "string" ? children : String(children ?? "");
  const lang = className?.replace(/^language-/, "") ?? "text";
  const isDark = resolvedTheme === "dark";
  const style = isDark ? oneDark : oneLight;

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [code]);

  return (
    <div className="group relative my-8">
      <div className="flex items-center justify-between gap-2 rounded-t-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--foreground-muted)]">{lang}</span>
        </div>
        <button
          type="button"
          onClick={copyToClipboard}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all duration-200 ${
            copied 
              ? "bg-emerald-500 text-white shadow-emerald-500/20" 
              : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] hover:shadow-sm"
          }`}
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="code-block-highlight overflow-x-auto overflow-y-hidden rounded-b-xl border border-t-0 border-[var(--border)] bg-[var(--code-bg)] shadow-lg shadow-black/5">
        <SyntaxHighlighter
          language={lang === "text" ? "plaintext" : lang}
          style={style}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: "1.25rem 1.5rem",
            lineHeight: "1.6",
            background: "transparent",
            border: "none",
            borderRadius: 0,
            fontSize: "0.9rem",
          }}
          codeTagProps={{
            className: "text-left whitespace-pre break-normal font-mono",
            style: { fontFamily: "var(--font-mono)" },
          }}
          showLineNumbers={false}
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
