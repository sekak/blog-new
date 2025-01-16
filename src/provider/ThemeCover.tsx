'use client'
import { useContextTheme } from '@/context/ThemeContext'
import { ThemeProviderProps } from '@/types/context'
import React from 'react'

const ThemeCover = ({children}:ThemeProviderProps) => {
    const Theme = useContextTheme()
  return (
    <div className={`${Theme.mode}`}>
      {children}
    </div>
  )
}

export default ThemeCover
