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

  const saveText = React.useCallback(async () => {
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
  }, [key, text])

  const retrieveText = React.useCallback(async () => {
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
  }, [key])

  const shorten = React.useCallback(async () => {
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
  }, [url, customKey])

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
  }, [tab, saveText, retrieveText, shorten])

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 flex flex-col items-center gap-5 text-center md:mb-12">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
              <ShieldCheck className="h-8 w-8 text-white" aria-hidden />
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">T-Vault</h1>
          </div>
          <p className="max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
            Share text across devices and create short links with QR codes. No login required. All items auto-delete after 24 hours for your privacy.
          </p>
          <div
            className={cn("w-full max-w-2xl rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-sm dark:border-blue-900 dark:bg-blue-950/20")}
            role="note"
          >
            <div className="flex items-center justify-center gap-2 text-blue-900 dark:text-blue-200">
              <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden />
              <span>Use a unique key for quick access. Press <kbd className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs dark:bg-blue-900">Ctrl+?</kbd> for shortcuts.</span>
            </div>
          </div>
        </header>

        <Card className="border-2 shadow-lg">
          <CardHeader className="border-b bg-muted/30 pb-4">
            <CardTitle className="text-xl font-semibold">Workspace</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <Tabs value={tab} onValueChange={(v) => setTab(v as "text" | "url")} className="w-full">
              <TabsList className="grid h-11 w-full grid-cols-2 p-1">
                <TabsTrigger value="text" aria-label="Text Vault" className="text-sm font-medium md:text-base">
                  📝 Text Vault
                </TabsTrigger>
                <TabsTrigger value="url" aria-label="URL Shortener" className="text-sm font-medium md:text-base">
                  🔗 URL Shortener
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="mt-8">
                <div className="grid gap-6 md:gap-8">
                  <div className="grid gap-3">
                    <Label htmlFor="storage-key" className="text-base font-semibold text-foreground">
                      Storage Key
                    </Label>
                    <div className="relative">
                      <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="storage-key"
                        ref={keyRef}
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="my-unique-key"
                        className="h-12 pl-12 text-base md:h-14 md:text-lg"
                        aria-describedby="key-help"
                      />
                    </div>
                    <p id="key-help" className="text-sm text-muted-foreground">
                      Choose a memorable key to access your text from any device. Keep it private.
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="text-area" className="text-base font-semibold text-foreground">
                      Your Text
                    </Label>
                    <textarea
                      id="text-area"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Paste or type your text here...&#10;&#10;• Code snippets&#10;• Notes&#10;• Messages&#10;• Anything you need to share"
                      className={cn(
                        "min-h-[280px] resize-y rounded-lg border-2 bg-background px-4 py-3 text-base leading-relaxed md:min-h-[320px] md:text-lg",
                        "placeholder:text-muted-foreground/60",
                        "focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/10",
                      )}
                    />
                    <p className="text-sm text-muted-foreground">
                      {text.length > 0 ? `${text.length} characters` : "Start typing..."}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button 
                      onClick={saveText} 
                      disabled={loading || !key || !text} 
                      className="h-12 flex-1 text-base font-semibold shadow-md transition-all hover:shadow-lg md:h-14"
                      size="lg"
                    >
                      <Save className="mr-2 h-5 w-5" aria-hidden />
                      {loading ? "Saving…" : "Save Text"}
                    </Button>
                    <Button 
                      onClick={retrieveText} 
                      disabled={loading || !key} 
                      variant="secondary" 
                      className="h-12 flex-1 text-base font-semibold md:h-14"
                      size="lg"
                    >
                      <Search className="mr-2 h-5 w-5" aria-hidden />
                      {loading ? "Retrieving…" : "Retrieve Text"}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="url" className="mt-8">
                <div className="grid gap-6 md:gap-8">
                  <div className="grid gap-3">
                    <Label htmlFor="url-input" className="text-base font-semibold text-foreground">
                      Long URL
                    </Label>
                    <div className="relative">
                      <Link2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="url-input"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/some/very/long/path/that/needs/shortening"
                        className="h-12 pl-12 text-base md:h-14 md:text-lg"
                        inputMode="url"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Paste the long URL you want to shorten and share easily.
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="custom-key" className="text-base font-semibold text-foreground">
                      Custom Short Code <span className="font-normal text-muted-foreground">(optional)</span>
                    </Label>
                    <Input
                      id="custom-key"
                      value={customKey}
                      onChange={(e) => setCustomKey(e.target.value)}
                      placeholder="my-link"
                      className="h-12 text-base md:h-14 md:text-lg"
                    />
                    <p className="text-sm text-muted-foreground">
                      Choose a memorable code like &quot;my-link&quot; to get <span className="font-mono text-foreground">/u/my-link</span>. Leave blank for auto-generated code.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button 
                      onClick={shorten} 
                      disabled={loading || !url} 
                      className="h-12 flex-1 text-base font-semibold shadow-md transition-all hover:shadow-lg md:h-14"
                      size="lg"
                    >
                      <Wand2 className="mr-2 h-5 w-5" aria-hidden />
                      {loading ? "Shortening…" : "Shorten URL"}
                    </Button>
                  </div>

                  {shortCode && shortUrl && (
                    <div className="grid gap-6 rounded-xl border-2 border-green-200 bg-green-50/50 p-6 shadow-sm dark:border-green-900 dark:bg-green-950/20 md:p-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-green-900 dark:text-green-200">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                            <QrCode className="h-5 w-5" aria-hidden />
                          </div>
                          <h3 className="text-lg font-semibold">Your Short Link is Ready!</h3>
                        </div>
                        
                        <div className="rounded-lg border border-green-300 bg-white p-4 dark:border-green-800 dark:bg-green-950/40">
                          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Short URL</p>
                          <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block break-all text-lg font-semibold text-blue-600 hover:underline md:text-xl"
                          >
                            {shortUrl}
                          </a>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <CopyButton text={shortUrl} className="flex-1" />
                          <Button asChild variant="outline" size="lg" className="flex-1" aria-label="Open short URL in a new tab">
                            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                              Open Link
                            </a>
                          </Button>
                        </div>
                      </div>

                      <div className="flex w-full flex-col items-center gap-4">
                        <div className="w-full border-t border-green-200 dark:border-green-800" />
                        <div className="rounded-xl border-2 bg-white p-6 shadow-sm dark:bg-card" aria-label="QR code for shortened URL">
                          <QRCodeSVG
                            value={shortUrl}
                            size={200}
                            bgColor="transparent"
                            fgColor="currentColor"
                            className="text-foreground"
                          />
                        </div>
                        <p className="text-center text-sm text-muted-foreground">
                          Scan this QR code to open the link on mobile devices
                        </p>
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
              "mt-8 flex items-center justify-center gap-3 rounded-xl border-2 p-5 text-center font-medium shadow-sm md:p-6",
              status.type === "success"
                ? "border-green-300 bg-green-100 text-green-900 dark:border-green-800 dark:bg-green-950/30 dark:text-green-100"
                : "border-red-300 bg-red-100 text-red-900 dark:border-red-800 dark:bg-red-950/30 dark:text-red-100",
            )}
            role="status"
            aria-live="polite"
          >
            {status.type === "success" ? (
              <ShieldCheck className="h-6 w-6 flex-shrink-0" aria-hidden />
            ) : (
              <AlertCircle className="h-6 w-6 flex-shrink-0" aria-hidden />
            )}
            <span className="text-base md:text-lg">{status.message}</span>
          </div>
        )}

        <Card className="mt-10 border-2 bg-gradient-to-br from-secondary/30 to-secondary/10 shadow-lg md:mt-12">
          <CardHeader className="pb-6">
            <CardTitle className="text-center text-xl md:text-2xl">Why Choose T-Vault?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              <div className="space-y-3 rounded-xl bg-background/50 p-5 text-center transition-all hover:bg-background/80 hover:shadow-md">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
                  <KeyRound className="h-7 w-7 text-white" aria-hidden />
                </div>
                <p className="text-lg font-semibold text-foreground">No Login</p>
                <p className="text-sm leading-relaxed text-muted-foreground">Just enter a key and start sharing—no account needed.</p>
              </div>
              <div className="space-y-3 rounded-xl bg-background/50 p-5 text-center transition-all hover:bg-background/80 hover:shadow-md">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30">
                  <ShieldCheck className="h-7 w-7 text-white" aria-hidden />
                </div>
                <p className="text-lg font-semibold text-foreground">Auto-Delete</p>
                <p className="text-sm leading-relaxed text-muted-foreground">All data is removed after 24 hours automatically.</p>
              </div>
              <div className="space-y-3 rounded-xl bg-background/50 p-5 text-center transition-all hover:bg-background/80 hover:shadow-md">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30">
                  <QrCode className="h-7 w-7 text-white" aria-hidden />
                </div>
                <p className="text-lg font-semibold text-foreground">QR Codes</p>
                <p className="text-sm leading-relaxed text-muted-foreground">Instantly generate QR codes for your short URLs.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 rounded-xl border-2 border-amber-200 bg-amber-50/50 px-5 py-4 text-center text-sm leading-relaxed text-amber-900 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-100 md:text-base">
          <strong>⏰ Auto-Deletion:</strong> All stored items are automatically deleted after 24 hours. Please don&apos;t store sensitive information.
        </div>
      </div>

      <KeyboardShortcuts open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </>
  )
}
