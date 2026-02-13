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
    <div className="group relative my-4">
      <div className="flex items-center justify-between gap-2 rounded-t-lg border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2">
        <span className="text-xs opacity-80">{lang}</span>
        <button
          type="button"
          onClick={copyToClipboard}
          className="rounded px-2 py-1 text-xs font-medium opacity-80 hover:opacity-100"
          aria-label="Copy to clipboard"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="code-block-highlight overflow-hidden rounded-b-lg border border-t-0 border-[var(--border)]">
        <SyntaxHighlighter
          language={lang === "text" ? "plaintext" : lang}
          style={style}
          PreTag="pre"
          customStyle={{
            margin: 0,
            padding: "1rem 1rem",
            fontSize: "13px",
            lineHeight: "20px",
            background: "var(--code-bg)",
            border: "none",
            borderRadius: 0,
          }}
          codeTagProps={{
            className: "text-left whitespace-pre break-normal font-mono",
            style: { fontFamily: "ui-monospace, monospace" },
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
