"use client"

import * as React from "react"
import { KeyRound, Clock, ArrowLeft, RefreshCw, AlertCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function ActiveViewer() {
  const [key, setKey] = React.useState("")
  const [intervalSecs, setIntervalSecs] = React.useState(3)
  const [text, setText] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null)

  // Load from local storage on mount
  React.useEffect(() => {
    const savedKey = localStorage.getItem("tvault-active-key")
    if (savedKey) setKey(savedKey)
    
    const savedInterval = localStorage.getItem("tvault-active-interval")
    if (savedInterval) {
      const parsed = parseInt(savedInterval, 10)
      if (!isNaN(parsed) && parsed > 0) setIntervalSecs(parsed)
    }
  }, [])

  // Save to local storage on change
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value
    setKey(newKey)
    localStorage.setItem("tvault-active-key", newKey)
  }

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInterval = parseInt(e.target.value, 10)
    setIntervalSecs(isNaN(newInterval) ? 0 : newInterval)
    if (!isNaN(newInterval) && newInterval > 0) {
      localStorage.setItem("tvault-active-interval", newInterval.toString())
    }
  }

  const fetchText = React.useCallback(async () => {
    if (!key) {
      setText("")
      return
    }
    
    try {
      setLoading(true)
      const res = await fetch(`/api/text?key=${encodeURIComponent(key)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to retrieve text")
      setText(data.text || "")
      setError(null)
      setLastUpdated(new Date())
    } catch (e: any) {
      setError(e.message || "Error retrieving text")
    } finally {
      setLoading(false)
    }
  }, [key])

  // Initial fetch when key changes
  React.useEffect(() => {
    fetchText()
  }, [key, fetchText])

  // Polling
  React.useEffect(() => {
    if (!key || intervalSecs <= 0) return

    const timer = setInterval(() => {
      fetchText()
    }, intervalSecs * 1000)

    return () => clearInterval(timer)
  }, [key, intervalSecs, fetchText])

  return (
    <div className="mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Active Viewer</h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Automatically fetch and display the latest text for your key.
          </p>
        </div>
        <Button variant="outline" asChild className="hidden sm:inline-flex">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Vault
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Settings Panel */}
        <Card className="shadow-sm border-2 md:col-span-1">
          <CardHeader className="border-b bg-muted/10 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheck className="h-5 w-5 text-blue-500" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="active-key" className="font-semibold text-foreground">
                Default Key
              </Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="active-key"
                  placeholder="Enter your key..."
                  value={key}
                  onChange={handleKeyChange}
                  className="pl-9 h-11"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Stored securely in your browser locally.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="refresh-interval" className="font-semibold text-foreground">
                Refresh Interval (sec)
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="refresh-interval"
                  type="number"
                  min="1"
                  value={intervalSecs || ""}
                  onChange={handleIntervalChange}
                  className="pl-9 h-11"
                />
              </div>
            </div>

            <Button 
              onClick={fetchText} 
              disabled={loading || !key} 
              className="h-11 w-full"
              variant="secondary"
            >
              <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
              {loading ? "Fetching..." : "Fetch Now"}
            </Button>
            
            {error && (
              <div className="flex items-start gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Display Panel */}
        <Card className="shadow-sm border-2 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-muted/10 pb-4">
            <CardTitle className="text-lg">Live Content</CardTitle>
            {lastUpdated && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                Updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-6">
            {!key ? (
              <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20 text-muted-foreground">
                <KeyRound className="mb-4 h-10 w-10 opacity-20" />
                <p>Enter a key to start watching</p>
              </div>
            ) : (
              <div className="relative">
                <pre className="min-h-[300px] w-full whitespace-pre-wrap rounded-lg border bg-slate-50 p-4 font-mono text-sm leading-relaxed dark:bg-slate-950">
                  {text || "No content found for this key."}
                </pre>
                {loading && (
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 shadow-sm backdrop-blur-sm">
                    <RefreshCw className="h-3 w-3 animate-spin text-blue-500" />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 flex justify-center sm:hidden">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Vault
          </Link>
        </Button>
      </div>
    </div>
  )
}
