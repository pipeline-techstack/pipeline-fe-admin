'use client'

import React from 'react'

interface HeaderProps {
  onLogout: () => void
}

export function Header({ onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 h-16">
      {/* <div className="flex items-center justify-between px-6 h-full">
      </div> */}
    </header>
  )
}