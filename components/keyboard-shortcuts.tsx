"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
}

const Row = ({ k, d }: { k: string; d: string }) => (
  <div className="flex items-center justify-between py-2 border-b last:border-none">
    <span className="text-sm text-muted-foreground">{d}</span>
    <kbd className="text-xs rounded-md bg-secondary px-2 py-1 font-mono">{k}</kbd>
  </div>
)

export function KeyboardShortcuts({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-label="Keyboard shortcuts">
        <DialogHeader>
          <DialogTitle className="text-pretty">Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Boost your productivity. Press Ctrl+? (or Ctrl+/) anytime to open this list.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Row k="Ctrl+K" d="Focus Storage Key" />
          <Row k="Ctrl+S" d="Save Text" />
          <Row k="Ctrl+R" d="Retrieve Text" />
          <Row k="Ctrl+L" d="Shorten URL" />
          <Row k="Ctrl+1" d="Switch to Text Vault tab" />
          <Row k="Ctrl+2" d="Switch to URL Shortener tab" />
          <Row k="Esc" d="Close dialogs" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
