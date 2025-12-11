import type { Metadata } from "next"
import { Download, ExternalLink, Smartphone, Terminal, Globe } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const WEB_REPO = "https://github.com/yellareddymaheshreddy/tvault"
const WEB_LIVE = "https://tvault.mahs.me"
const APK_URL = "https://github.com/yellareddymaheshreddy/tvault-reactnative/releases/download/v1.0.0/tvault-v1.0.0.apk"
const MOBILE_REPO = "https://github.com/yellareddymaheshreddy/tvault-reactnative"
const CLI_REPO = "https://github.com/yellareddymaheshreddy/tvault-cli"
const CLI_INSTALL = "npm i -g tvault-cli"
const CLI_USAGE = "tvault shorten -k hel https://github.com/yellareddymaheshreddy/tvault-reactnative/releases/download/v1.0.0/tvault-v1.0.0.apk"

export const metadata: Metadata = {
  title: "T-Vault Apps & CLI",
  description: "Use T-Vault on the web, Android, or via CLI. Download, install, and contribute.",
}

export default function AppsPage() {
  return (
    <main className="space-y-8 md:space-y-10">
      <div className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">All the ways to use T-Vault</p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Web, Mobile, and CLI</h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
          Pick the interface that fits your workflow—use the web app, install the Android app, or run the CLI from any shell.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-2 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Globe className="h-5 w-5 text-blue-600" aria-hidden />
                Web App
              </CardTitle>
              <CardDescription>Use T-Vault in the browser for instant text sharing and URL shortening.</CardDescription>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-100">
              Live
            </span>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              The full T-Vault experience with text vault, URL shortener, QR codes, and keyboard shortcuts. No login required and
              everything auto-expires after 24 hours.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button asChild size="lg" className="w-full sm:flex-1 sm:min-w-[180px]">
                <a href={WEB_LIVE} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
                  Open Web App
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:flex-1 sm:min-w-[180px]">
                <a href={WEB_REPO} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
                  View Web Repo
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Smartphone className="h-5 w-5 text-blue-600" aria-hidden />
                Android App
              </CardTitle>
              <CardDescription>Install the T-Vault mobile app for quick sharing without opening a browser.</CardDescription>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-100">
              v1.0.0
            </span>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Download the signed APK and install it on your Android device. The app mirrors the web experience with the same
              24-hour auto-delete policy and no-login simplicity.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button asChild size="lg" className="w-full sm:flex-1 sm:min-w-[180px]">
                <a href={APK_URL} target="_blank" rel="noreferrer">
                  <Download className="mr-2 h-4 w-4" aria-hidden />
                  Download APK
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:flex-1 sm:min-w-[180px]">
                <a href={MOBILE_REPO} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
                  View Mobile Repo
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Safety tip: enable installs from trusted sources only when installing.</p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Terminal className="h-5 w-5 text-foreground" aria-hidden />
                CLI Tool
              </CardTitle>
              <CardDescription>Install globally via npm and shorten links straight from your shell.</CardDescription>
            </div>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-foreground dark:bg-zinc-800">
              npm global
            </span>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <div className="space-y-2">
              <p className="text-foreground">Install:</p>
              <code className="block overflow-x-auto rounded-lg bg-muted px-3 py-2 text-sm text-foreground whitespace-pre-wrap break-all">{CLI_INSTALL}</code>
            </div>
            <div className="space-y-2">
              <p className="text-foreground">Example:</p>
              <code className="block overflow-x-auto rounded-lg bg-muted px-3 py-2 text-sm text-foreground whitespace-pre-wrap break-all">{CLI_USAGE}</code>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button asChild size="lg" className="w-full sm:flex-1 sm:min-w-[180px]">
                <Link href="/">
                  Open Web
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:flex-1 sm:min-w-[180px]">
                <a href={CLI_REPO} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
                  View CLI Repo
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Tip: pair with shell aliases for instant sharing during workflows.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
