"use client"

import { useState, useEffect } from "react"
import Login from "@/components/Login"
import Signup from "@/components/Signup"
import Dashboard from "@/components/Dashboard"

export default function App() {
  const [currentView, setCurrentView] = useState("login")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setCurrentView("dashboard")
    }
  }, [])

  const handleLoginSuccess = (userData) => {
    setUser(userData)
    localStorage.setItem("currentUser", JSON.stringify(userData))
    setCurrentView("dashboard")
  }

  const handleSignupSuccess = () => {
    setCurrentView("login")
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
    setCurrentView("login")
  }

  return (
    <div className="min-h-screen bg-background">
      {currentView === "login" && (
        <Login onLoginSuccess={handleLoginSuccess} onGoToSignup={() => setCurrentView("signup")} />
      )}
      {currentView === "signup" && (
        <Signup onSignupSuccess={handleSignupSuccess} onGoToLogin={() => setCurrentView("login")} />
      )}
      {currentView === "dashboard" && <Dashboard user={user} onLogout={handleLogout} />}
    </div>
  )
}
