import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProgressProvider } from "@/lib/progress";
import { AppShell } from "@/components/AppShell";
import { PwaRegister } from "@/components/PwaRegister";
import { InstallBanner } from "@/components/InstallBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend Interview Book",
  description: "Senior Frontend Engineer interview preparation guide",
  manifest: "/manifest.json",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Interview Book",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
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
            <PwaRegister />
            <AppShell>{children}</AppShell>
            <InstallBanner />
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
