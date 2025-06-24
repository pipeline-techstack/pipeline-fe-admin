'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Home, Users, Copyright } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', key: 'dashboard', icon: Home},
  { name: 'Organization', key: 'organization', icon: Users },
]

interface SidebarProps {
  currentView: string
  onNavigate: (view: string) => void
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Pipeline</h1>
        <p className="text-sm text-gray-500">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = currentView === item.key
          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.key)}
              className={cn(
                'flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left',
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Pipeline Admin Dashboard</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
                <Copyright className="w-3 h-3" /> 2025 All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
