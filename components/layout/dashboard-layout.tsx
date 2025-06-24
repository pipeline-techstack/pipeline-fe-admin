import React from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'

interface DashboardLayoutProps {
  children: React.ReactNode
  currentView: string
  onNavigate: (view: string) => void
  onLogout: () => void
}

export function DashboardLayout({ 
  children, 
  currentView, 
  onNavigate, 
  onLogout 
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onNavigate={onNavigate} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onLogout={onLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}