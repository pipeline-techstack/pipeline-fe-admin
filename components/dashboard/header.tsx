import React from 'react'
import { LogOut } from 'lucide-react'

interface HeaderProps {
  onLogout: () => void
}

export function Header({ onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between px-6 h-full">
        <div></div>
        <button
          onClick={onLogout}
          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors relative group"
          aria-label="Logout"
        >
          <LogOut size={20} />
          <span className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-500 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Logout
          </span>
        </button>
      </div>
    </header>
  )
}