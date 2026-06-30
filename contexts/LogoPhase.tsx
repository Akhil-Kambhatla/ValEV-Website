'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

// 'hero'  — hero logo occupies the center viewport; nav logo is a hidden placeholder
// 'nav'   — logo lives in the navbar; hero logo is unmounted
type LogoPhase = 'hero' | 'nav'

interface LogoPhaseCtx {
  phase:    LogoPhase
  setPhase: (p: LogoPhase) => void
}

const LogoPhaseContext = createContext<LogoPhaseCtx>({
  phase:    'hero',
  setPhase: () => {},
})

export function LogoPhaseProvider({ children }: { children: ReactNode }) {
  // Start as 'hero' to match SSR default (avoids hydration mismatch).
  // On mount, flip to 'nav' immediately if this session has already played.
  const [phase, setPhase] = useState<LogoPhase>('hero')

  useEffect(() => {
    if (sessionStorage.getItem('valev-logo-played')) {
      setPhase('nav')
    }
  }, [])

  return (
    <LogoPhaseContext.Provider value={{ phase, setPhase }}>
      {children}
    </LogoPhaseContext.Provider>
  )
}

export const useLogoPhase = () => useContext(LogoPhaseContext)
