import type { Metadata } from "next"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy Policy | T-Vault",
  description: "Learn how T-Vault stores, handles, and deletes your data.",
}

const sections = [
  {
    title: "What we store",
    body: [
      "Your submitted text or URLs are stored in Redis Cloud in plain text so they can be retrieved by your unique key.",
      "Items automatically expire after roughly 24 hours; no historical backups are kept by the app.",
    ],
  },
  {
    title: "No accounts or trackers",
    body: [
      "T-Vault does not require login and does not run third-party analytics or advertising scripts.",
      "Basic server logs (e.g., IP address, user agent, timestamp, path) may be recorded briefly for abuse prevention and troubleshooting.",
    ],
  },
  {
    title: "Security and limitations",
    body: [
      "Content is stored in plain text; do not store passwords, personal data, or anything you would not want exposed.",
      "Transport uses HTTPS when supported by your browser; however, you are responsible for what you upload and share.",
    ],
  },
  {
    title: "Third-party services",
    body: [
      "Storage is provided by Redis Cloud. Their infrastructure and regional policies apply to data while it exists in the cache.",
    ],
  },
  {
    title: "Your responsibilities",
    body: [
      "Share data only with people you trust and keep your keys private.",
      "Do not use the service for unlawful activity, academic misconduct, or to store sensitive personal information.",
    ],
  },
  {
    title: "Data removal",
    body: [
      "Entries expire automatically after the retention window. If you need immediate removal, delete the item by overwriting it with an empty value and allowing the cache to expire.",
    ],
  },
  {
    title: "Updates",
    body: [
      "We may update this policy over time. Continued use of the service means you accept the latest version.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-blue-600">Privacy Policy</p>
        <h1 className="text-3xl font-bold tracking-tight">How T-Vault handles your data</h1>
        <p className="max-w-3xl text-muted-foreground">
          T-Vault is designed for quick, no-login sharing. Because content is stored in plain text for up to 24 hours, please
          review this policy so you know how your data is handled and how to use the service responsibly.
        </p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg">The essentials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-sm leading-6 text-muted-foreground">
          {sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">{section.title}</h2>
              <ul className="list-disc space-y-1 pl-5">
                {section.body.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="rounded-lg bg-secondary px-4 py-3 text-foreground">
            T-Vault is best for temporary, low-risk snippets. Avoid storing secrets, personal data, or anything protected by
            law or policy.
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
