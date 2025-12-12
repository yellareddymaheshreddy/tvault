import type { Metadata } from "next"
import Link from "next/link"
import { BookOpen, Code, Zap, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About | T-Vault",
  description: "Learn about T-Vault, its use cases, and why it was built.",
}

const useCases = [
  {
    icon: BookOpen,
    title: "Study & Exams",
    description:
      "Quickly access notes or reference material from a lab computer during exams. Just remember your key and retrieve your content instantly.",
  },
  {
    icon: Code,
    title: "Developer Tools",
    description:
      "Share code snippets, API keys for testing, or logs between your local machine and a remote server without emails or chat apps.",
  },
  {
    icon: Zap,
    title: "Quick Links",
    description:
      "Generate short links with QR codes for presentations, events, or sharing long URLs on social media or print materials.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Pass temporary text or links to teammates without creating accounts or sharing sensitive information through permanent channels.",
  },
]

export default function AboutPage() {
  return (
    <main className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-blue-600">About T-Vault</p>
        <h1 className="text-3xl font-bold tracking-tight">Built for simplicity and speed</h1>
        <p className="max-w-3xl text-muted-foreground">
          T-Vault was designed to solve a simple problem: how do you quickly share text or links between devices without creating
          accounts, installing apps, or worrying about privacy?
        </p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg">The Story</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            During college exams, I often needed to access notes or reference material on lab computers. Emailing myself was slow
            and left traces. Cloud storage required login. Messaging apps were blocked or monitored.
          </p>
          <p>
            So I built T-Vault: a dead-simple web app where you store text with a key, then retrieve it from anywhere with just
            that key. No login, no password, no tracking. It auto-deletes after 24 hours, so there&apos;s no long-term footprint.
          </p>
          <p>
            Over time, I added URL shortening with QR codes, keyboard shortcuts, and a clean UI. Now it&apos;s useful for
            developers, students, and anyone who needs fast, temporary sharing.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Common Use Cases</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {useCases.map((useCase) => {
            const Icon = useCase.icon
            return (
              <Card key={useCase.title} className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <Icon className="h-5 w-5 text-blue-600" aria-hidden />
                    </div>
                    <CardTitle className="text-base">{useCase.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <Card className="border-2 bg-secondary/30">
        <CardContent className="py-6 text-center text-sm">
          <p className="font-medium text-foreground">Ready to try it?</p>
          <p className="mt-1 text-muted-foreground">
            Head to the{" "}
            <Link href="/" className="font-medium text-blue-600 underline hover:text-blue-700">
              home page
            </Link>{" "}
            and start sharing in seconds.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
