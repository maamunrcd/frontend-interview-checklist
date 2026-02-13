import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProgressProvider } from "@/lib/progress";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend Interview Book",
  description: "Senior Frontend Engineer interview preparation guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <ProgressProvider>
            <AppShell>{children}</AppShell>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
