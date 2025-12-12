import type { Metadata } from "next"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terms of Service | T-Vault",
  description: "Review the acceptable use terms for T-Vault before sharing content.",
}

const terms = [
  {
    title: "Service intent",
    items: [
      "T-Vault is a temporary text and link relay. Content expires after roughly 24 hours and is not intended for archival storage.",
      "The service is provided on a best-effort basis without uptime guarantees.",
    ],
  },
  {
    title: "Acceptable use",
    items: [
      "Do not use T-Vault for unlawful activity, academic misconduct, harassment, or distribution of harmful content.",
      "Do not store sensitive personal information (passwords, government IDs, financial data, protected health information).",
      "Respect intellectual property rights and only upload content you are allowed to share.",
    ],
  },
  {
    title: "Data handling",
    items: [
      "Data is stored in plain text in Redis Cloud until it expires. Anyone with the unique code can read it.",
      "If you overwrite an entry with an empty value, it will be cleared and then expire per cache policy.",
    ],
  },
  {
    title: "User responsibility",
    items: [
      "You are responsible for safeguarding the keys or codes you generate and for the consequences of sharing them.",
      "You agree to indemnify the maintainer against claims resulting from your use of the service.",
    ],
  },
  {
    title: "Changes and termination",
    items: [
      "The service may change or be discontinued at any time without notice.",
      "Continued use after updates to these terms constitutes acceptance of the revised terms.",
    ],
  },
  {
    title: "Disclaimer",
    items: [
      "The service is provided “as is” without warranties of any kind, including availability, security, or fitness for a particular purpose.",
      "To the fullest extent permitted by law, liability for any indirect, incidental, or consequential damages is disclaimed.",
    ],
  },
]

export default function TermsPage() {
  return (
    <main className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-blue-600">Terms of Service</p>
        <h1 className="text-3xl font-bold tracking-tight">Use T-Vault responsibly</h1>
        <p className="max-w-3xl text-muted-foreground">
          By using T-Vault you agree to these terms. The service is meant for quick, low-risk sharing and is not a substitute for
          secure document storage.
        </p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg">Key terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-sm leading-6 text-muted-foreground">
          {terms.map((section) => (
            <section key={section.title} className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">{section.title}</h2>
              <ul className="list-disc space-y-1 pl-5">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
          <div className="rounded-lg bg-secondary px-4 py-3 text-foreground">
            If you disagree with these terms, please discontinue use of the service.
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
