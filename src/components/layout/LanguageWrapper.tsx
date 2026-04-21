"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

export const LanguageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { direction } = useLanguage()
  const pathname = usePathname()

  // Requirement: RTL must NOT include /admin
  const isAdmin = pathname?.startsWith('/admin')
  const currentDir = isAdmin ? 'ltr' : direction

  return (
    <div dir={currentDir} className="min-h-screen flex flex-col">
      {children}
    </div>
  )
}
