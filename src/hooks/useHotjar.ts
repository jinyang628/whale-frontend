'use client'

import { useEffect } from 'react'
import Hotjar from '@hotjar/browser'

export function HotjarInit() {
  useEffect(() => {
    const HOTJAR_VERSION = 6
    const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID

    if (hotjarId) {
      Hotjar.init(parseInt(hotjarId), HOTJAR_VERSION)
    }
  }, [])

  return null // This component doesn't render anything
}