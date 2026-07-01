'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Runs after cross-page navigation (e.g. /about → /#network) and smoothly
// scrolls to the hash target once the homepage has rendered.
export function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const id = hash.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    const timer = setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth' })
    }, 120)
    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
