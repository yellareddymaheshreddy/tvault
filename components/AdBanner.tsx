"use client"

import React, { useEffect } from "react"
import { usePathname } from "next/navigation"

type AdBannerProps = {
  dataAdSlot: string
  dataAdFormat?: string
  dataFullWidthResponsive?: boolean
}

export function AdBanner({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
}: AdBannerProps) {
  const pathname = usePathname()

  useEffect(() => {
    try {
      // @ts-ignore
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err: any) {
      console.error(err.message)
    }
  }, [pathname])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || "ca-pub-4581670332384636"}
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    />
  )
}
