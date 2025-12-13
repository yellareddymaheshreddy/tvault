"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <Button
      type="button"
      variant="default"
      size="lg"
      className={className}
      aria-label="Copy to clipboard"
      onClick={async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
    >
      {copied ? (
        <>
          <Check className="mr-2 h-5 w-5" aria-hidden />
          Copied!
        </>
      ) : (
        <>
          <Copy className="mr-2 h-5 w-5" aria-hidden />
          Copy Link
        </>
      )}
    </Button>
  )
}
