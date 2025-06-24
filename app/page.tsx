"use client"
import React from "react"
import { useEffect, useState } from "react"
import LoginCard from "@/components/login-card"
import { isAuthenticated, logout } from "@/lib/auth"
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { OrganizationTable } from '@/components/dashboard/org-table'

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false)
  const [currentView, setCurrentView] = useState('dashboard')

  useEffect(() => {
    // Check if user is authenticated on component mount
    setAuthenticated(isAuthenticated())
  }, [])

  const handleLogout = () => {
    logout()
    setAuthenticated(false)
  }

  const handleNavigation = (view: string) => {
    setCurrentView(view)
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full">
          <LoginCard onLoginSuccess={() => setAuthenticated(true)} />
        </div>
      </main>
    )
  }

  return (
    <DashboardLayout 
      currentView={currentView} 
      onNavigate={handleNavigation}
      onLogout={handleLogout}
    >
      <div className="flex flex-col flex-1 space-y-6 h-full">
        {currentView === 'dashboard' && (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
            <p className="text-gray-600">Welcome to the admin dashboard. Select Organization to manage subscriptions.</p>
          </div>
        )}
        
        {currentView === 'organization' && (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Organization</h1>
              <p className="text-gray-600">See subscription details and status for all your organizations</p>
            </div>
            <OrganizationTable />
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}