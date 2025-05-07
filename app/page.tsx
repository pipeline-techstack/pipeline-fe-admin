"use client"

import { useEffect, useState } from "react"
import LoginCard from "@/components/login-card"
import AddSubscriptionCard from "@/components/add-subscription-card"
import ManageSubscriptionCard from "@/components/manage-subscription-card"
import { isAuthenticated, logout } from "@/lib/auth"

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated on component mount
    setAuthenticated(isAuthenticated())
  }, [])

  const handleLogout = () => {
    logout()
    setAuthenticated(false)
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          {authenticated && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          )}
        </header>

        {!authenticated ? (
          <div className="max-w-md mx-auto">
            <LoginCard onLoginSuccess={() => setAuthenticated(true)} />
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            <AddSubscriptionCard />
            <ManageSubscriptionCard />
          </div>
        )}
      </div>
    </main>
  )
}
