import Link from "next/link";
import type { Metadata } from "next";
import { Github, ShieldCheck } from "lucide-react";

import "./globals.css";

export const metadata: Metadata = {
  title: 'T-Vault - Temporary Text & URL Sharing',
  description: 'Share text and URLs instantly without login. Auto-delete after 24 hours. Perfect for cross-device sharing, QR codes, and quick links. No tracking, no ads.',
  keywords: 'temporary text storage, url shortener, qr code generator, no login sharing, ephemeral messages, text vault, pastebin alternative',
  metadataBase: new URL('https://tvault.mahs.me'), 
  openGraph: {
    title: 'T-Vault - Temporary Text & URL Sharing',
    description: 'Share text and URLs instantly without login. Auto-delete after 24 hours.',
    type: 'website',
    locale: 'en_US',
    siteName: 'T-Vault',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'T-Vault - Temporary Text & URL Sharing',
    description: 'Share text and URLs instantly without login. Auto-delete after 24 hours.',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Mahesh Reddy' }],
  creator: 'Mahesh Reddy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://tvault.mahs.me" /> 
      </head>
      <body className="antialiased">
        <div className="relative min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 text-foreground dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.16),transparent_30%)] blur-3xl" aria-hidden />

          <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="h-5 w-5 text-blue-600" aria-hidden />
                <span>T-Vault</span>
              </Link>

              <nav className="flex items-center gap-2 text-sm text-muted-foreground md:gap-4">
                <Link href="/about" className="hidden hover:text-foreground sm:inline">About</Link>
                <Link href="/privacy" className="hidden hover:text-foreground md:inline">Privacy</Link>
                <Link href="/terms" className="hidden hover:text-foreground md:inline">Terms</Link>
                <Link href="/settings" className="hover:text-foreground">Settings</Link>
                <a
                  href="https://github.com/yellareddymaheshreddy/tvault"
                  className="inline-flex items-center gap-1 rounded-md border px-2 py-1.5 text-xs font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:px-3"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View T-Vault on GitHub"
                >
                  <Github className="h-4 w-4" aria-hidden />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </nav>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-4 pb-12 pt-6 md:px-6 md:pt-10">
            {children}
          </div>

          <footer className="border-t bg-background/80 py-8 text-sm text-muted-foreground backdrop-blur">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                {/* Branding */}
                <div className="flex items-center gap-2 text-foreground">
                  <ShieldCheck className="h-4 w-4 text-blue-600" aria-hidden />
                  <span className="font-semibold">T-Vault</span>
                  <span className="ml-2 text-xs text-muted-foreground">© 2025</span>
                </div>

                {/* Two-column link grid */}
                <div className="grid grid-cols-2 gap-8 sm:gap-12">
                  {/* Column 1: Development */}
                  <div className="flex flex-col gap-2">
                    <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-foreground">Development</span>
                    <a href="https://github.com/yellareddymaheshreddy/tvault" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground">
                      <Github className="h-4 w-4" aria-hidden />
                      <span>GitHub</span>
                    </a>
                    <a href="https://github.com/yellareddymaheshreddy/tvault-cli" target="_blank" rel="noreferrer" className="hover:text-foreground">CLI</a>
                    <a href="https://github.com/yellareddymaheshreddy/tvault-reactnative" target="_blank" rel="noreferrer" className="hover:text-foreground">Mobile App</a>
                  </div>

                  {/* Column 2: Legal & Pages */}
                  <div className="flex flex-col gap-2">
                    <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-foreground">Legal & Pages</span>
                    <Link href="/" className="hover:text-foreground">Home</Link>
                    <Link href="/about" className="hover:text-foreground">About</Link>
                    <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
                    <Link href="/terms" className="hover:text-foreground">Terms</Link>
                    <Link href="/settings" className="hover:text-foreground">Settings</Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
