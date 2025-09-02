"use client"

import * as React from "react"
import { KeyRound, Save, Search, ShieldCheck, AlertCircle, Link2, QrCode, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { CopyButton } from "@/components/copy-button"
import { QRCodeSVG } from "qrcode.react"
import { cn } from "@/lib/utils"

type Status = { type: "success" | "error"; message: string } | null

export default function Home() {
  // Shared
  const [tab, setTab] = React.useState<"text" | "url">("text")
  const [shortcutsOpen, setShortcutsOpen] = React.useState(false)

  // Text Vault
  const keyRef = React.useRef<HTMLInputElement>(null)
  const [key, setKey] = React.useState("")
  const [text, setText] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState<Status>(null)

  // URL Shortener
  const [url, setUrl] = React.useState("")
  const [customKey, setCustomKey] = React.useState("")
  const [shortCode, setShortCode] = React.useState<string | null>(null)

  const shortUrl = React.useMemo(() => {
    if (!shortCode) return ""
    if (typeof window === "undefined") return ""
    return `${window.location.origin}/u/${shortCode}`
  }, [shortCode])

  // Keyboard shortcuts (Ctrl+? or Ctrl+/; plus helpers)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey // support Cmd on macOS
      const key = e.key

      // Ctrl+? (Shift + /) or Ctrl+/
      if (isCtrl && (key === "/" || key === "?")) {
        e.preventDefault()
        setShortcutsOpen(true)
        return
      }
      if (!isCtrl) return

      if (key === "1") {
        e.preventDefault()
        setTab("text")
        return
      }
      if (key === "2") {
        e.preventDefault()
        setTab("url")
        return
      }
      if (key.toLowerCase() === "k") {
        e.preventDefault()
        keyRef.current?.focus()
        return
      }
      if (key.toLowerCase() === "s" && tab === "text") {
        e.preventDefault()
        void saveText()
        return
      }
      if (key.toLowerCase() === "r" && tab === "text") {
        e.preventDefault()
        void retrieveText()
        return
      }
      if (key.toLowerCase() === "l" && tab === "url") {
        e.preventDefault()
        void shorten()
        return
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [tab, key, text, url, customKey]) // deps for latest state

  const saveText = async () => {
    try {
      setLoading(true)
      setStatus(null)
      const res = await fetch("/api/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, text }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to save text")
      setStatus({ type: "success", message: "Text saved successfully!" })
      // keep the text for quick edits; if you want to clear, uncomment:
      // setText('')
    } catch (e: unknown) {
      if (e instanceof Error) {
        setStatus({ type: "error", message: e.message });
      } else {
        setStatus({ type: "error", message: "Error Saving text" });
      }
    } finally {
      setLoading(false)
    }
  }

  const retrieveText = async () => {
    try {
      setLoading(true)
      setStatus(null)
      const res = await fetch(`/api/text?key=${encodeURIComponent(key)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to retrieve text")
      setText(data.text || "")
      setStatus({ type: "success", message: "Text retrieved successfully!" })
    } catch (e: unknown) {
      if (e instanceof Error) {
        setStatus({ type: "error", message: e.message });
      } else {
        setStatus({ type: "error", message: "Error retrieving text" });
      }
    } finally {
      setLoading(false)
    }
  }

  const shorten = async () => {
    try {
      setLoading(true)
      setStatus(null)
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, key: customKey || undefined }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to shorten URL")
      setShortCode(data.code)
      setStatus({ type: "success", message: "URL shortened successfully!" })
    } catch (e: unknown) {
      setShortCode(null)
      if (e instanceof Error) {
        setStatus({ type: "error", message: e.message });
      } else {
        setStatus({ type: "error", message: "Error retrieving text" });
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center">
            <ShieldCheck className="mr-2 h-8 w-8 text-blue-600" aria-hidden />
            <h1 className="text-balance text-3xl font-bold md:text-4xl">T‑Vault</h1>
          </div>
          <p className="max-w-xl text-pretty text-muted-foreground">
            Share text between your devices and create short links with QR codes. Items auto-delete after 24 hours.
          </p>
          <div
            className={cn("w-full max-w-2xl rounded-lg border p-4 text-sm", "bg-secondary text-secondary-foreground")}
            role="note"
          >
            <div className="flex items-center">
              <AlertCircle className="mr-2 h-4 w-4" aria-hidden />
              Use a unique key for quick access. Press Ctrl+? to view keyboard shortcuts.
            </div>
          </div>
        </header>

        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Workspace</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={(v) => setTab(v as "text" | "url")} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text" aria-label="Text Vault">
                  Text Vault
                </TabsTrigger>
                <TabsTrigger value="url" aria-label="URL Shortener">
                  URL Shortener
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="mt-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="storage-key" className="text-sm font-medium">
                      Storage Key
                    </Label>
                    <div className="relative">
                      <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="storage-key"
                        ref={keyRef}
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Enter a unique key"
                        className="pl-9"
                        aria-describedby="key-help"
                      />
                    </div>
                    <p id="key-help" className="text-xs text-muted-foreground">
                      This key is used to save and retrieve your text.
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="text-area" className="text-sm font-medium">
                      Your Text
                    </Label>
                    <textarea
                      id="text-area"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter your text here..."
                      className={cn(
                        "min-h-[200px] resize-y rounded-md border bg-background px-3 py-2",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button onClick={saveText} disabled={loading || !key || !text} className="flex-1">
                      <Save className="mr-2 h-4 w-4" aria-hidden />
                      {loading ? "Saving…" : "Save Text"}
                    </Button>
                    <Button onClick={retrieveText} disabled={loading || !key} variant="secondary" className="flex-1">
                      <Search className="mr-2 h-4 w-4" aria-hidden />
                      {loading ? "Retrieving…" : "Retrieve Text"}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="url" className="mt-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="url-input" className="text-sm font-medium">
                      Long URL
                    </Label>
                    <div className="relative">
                      <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="url-input"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/some/long/path"
                        className="pl-9"
                        inputMode="url"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="custom-key" className="text-sm font-medium">
                      Custom Key (optional)
                    </Label>
                    <Input
                      id="custom-key"
                      value={customKey}
                      onChange={(e) => setCustomKey(e.target.value)}
                      placeholder="letters, numbers, _ or -"
                    />
                    <p className="text-xs text-muted-foreground">
                      If set, your short URL becomes /u/your-key. Otherwise a code will be generated.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button onClick={shorten} disabled={loading || !url} className="flex-1">
                      <Wand2 className="mr-2 h-4 w-4" aria-hidden />
                      {loading ? "Shortening…" : "Shorten URL"}
                    </Button>
                  </div>

                  {shortCode && shortUrl && (
                    <div className="grid gap-4 rounded-lg border p-4">
                      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-2">
                          <QrCode className="h-5 w-5 text-blue-600" aria-hidden />
                          <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium underline"
                          >
                            {shortUrl}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <CopyButton text={shortUrl} />
                          <Button asChild variant="secondary" aria-label="Open short URL in a new tab">
                            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                              Open
                            </a>
                          </Button>
                        </div>
                      </div>

                      <div className="flex w-full justify-center">
                        <div className="rounded-lg border bg-card p-3" aria-label="QR code for shortened URL">
                          <QRCodeSVG
                            value={shortUrl}
                            size={160}
                            bgColor="transparent"
                            fgColor="currentColor"
                            className="text-foreground"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {status && (
          <div
            className={cn(
              "mt-6 flex items-center justify-center rounded-lg p-4 text-center",
              status.type === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-200",
            )}
            role="status"
            aria-live="polite"
          >
            {status.type === "success" ? (
              <ShieldCheck className="mr-2 h-5 w-5" aria-hidden />
            ) : (
              <AlertCircle className="mr-2 h-5 w-5" aria-hidden />
            )}
            {status.message}
          </div>
        )}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          All stored items are automatically deleted after 24 hours. Please don&apos;t store sensitive information.
        </p>
      </div>

      <KeyboardShortcuts open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </main>
  )
}
