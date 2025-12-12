import type { Metadata } from "next"
import { Github, ShieldCheck, Zap, Clock } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Settings | T-Vault",
  description: "App info, GitHub repository, and feature overview for T-Vault.",
}

export default function SettingsPage() {
  return (
    <main className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-blue-600">Settings & Info</p>
        <h1 className="text-3xl font-bold tracking-tight">About T-Vault</h1>
        <p className="max-w-3xl text-muted-foreground">
          Learn more about this project, contribute on GitHub, or review the core features.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-600" aria-hidden />
              <CardTitle className="text-lg">What is T-Vault?</CardTitle>
            </div>
            <CardDescription>A temporary sharing tool for quick, no-login data exchange.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              T-Vault was built to help people share text or links across devices and locations easily. Perfect for students,
              developers, or anyone who needs fast, ephemeral sharing without creating an account.
            </p>
            <p className="text-muted-foreground">
              Powered by Redis Cloud, everything expires after 24 hours to keep data minimal and temporary.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 text-foreground" aria-hidden />
              <CardTitle className="text-lg">Open Source</CardTitle>
            </div>
            <CardDescription>Contribute, file issues, or see how T-Vault works.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              T-Vault is open-source and available on GitHub. Check out the code, report bugs, or propose new features.
            </p>
            <Button asChild variant="outline" className="w-full">
              <a
                href="https://github.com/yellareddymaheshreddy/tvault"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Github className="h-4 w-4" aria-hidden />
                View on GitHub
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg">Features at a glance</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-4 md:grid-cols-2">
            <li className="flex items-start gap-3">
              <Zap className="mt-0.5 h-5 w-5 text-blue-600" aria-hidden />
              <div className="space-y-1">
                <p className="font-medium text-foreground">No signup</p>
                <p className="text-sm text-muted-foreground">
                  Just enter a key and your content. No account, password, or email needed.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-blue-600" aria-hidden />
              <div className="space-y-1">
                <p className="font-medium text-foreground">Auto-delete</p>
                <p className="text-sm text-muted-foreground">
                  Content is automatically removed after approximately 24 hours to keep the service lightweight.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-blue-600" aria-hidden />
              <div className="space-y-1">
                <p className="font-medium text-foreground">Simple & fast</p>
                <p className="text-sm text-muted-foreground">
                  No tracking, no ads, no bloat. Just clean, temporary data sharing.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Github className="mt-0.5 h-5 w-5 text-blue-600" aria-hidden />
              <div className="space-y-1">
                <p className="font-medium text-foreground">Open-source</p>
                <p className="text-sm text-muted-foreground">
                  The entire codebase is public on GitHub. Transparency by design.
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="space-y-2">
            <p className="font-medium text-foreground">How long is my data stored?</p>
            <p className="text-muted-foreground">
              All data automatically expires after approximately 24 hours. This is a hard limit enforced by Redis TTL.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-foreground">Is my data encrypted?</p>
            <p className="text-muted-foreground">
              Data is transmitted over HTTPS but stored in plain text on Redis. Do not store passwords or sensitive personal information.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-foreground">Can I delete my data early?</p>
            <p className="text-muted-foreground">
              Yes—overwrite your key with empty text or a placeholder. It will expire per the 24-hour policy.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-foreground">What happens if my key is guessed?</p>
            <p className="text-muted-foreground">
              Anyone with the key can access the data. Use unique, hard-to-guess keys for sensitive content.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg">Developer Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">API Documentation</span>
            <a
              href="https://github.com/yellareddymaheshreddy/tvault/blob/main/API.md"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-600 hover:underline"
            >
              View Docs →
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Contributing Guide</span>
            <a
              href="https://github.com/yellareddymaheshreddy/tvault/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-600 hover:underline"
            >
              Contribute →
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Security Policy</span>
            <a
              href="https://github.com/yellareddymaheshreddy/tvault/blob/main/SECURITY.md"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-600 hover:underline"
            >
              Read Policy →
            </a>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 bg-secondary/30">
        <CardContent className="py-6 text-center text-sm">
          <p className="font-medium text-foreground">Looking for help or want to report an issue?</p>
          <p className="mt-1 text-muted-foreground">
            Visit the{" "}
            <a
              href="https://github.com/yellareddymaheshreddy/tvault/issues"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-600 underline hover:text-blue-700"
            >
              GitHub Issues
            </a>{" "}
            page.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
