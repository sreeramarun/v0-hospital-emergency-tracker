"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function Signup({ onSignupSuccess, onGoToLogin }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSignup = () => {
    setError("")
    setSuccess("")

    if (!name || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    if (users.some((u) => u.email === email)) {
      setError("Email already registered")
      return
    }

    const newUser = { name, email, password }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    setSuccess("Account created successfully! Redirecting to login...")
    setName("")
    setEmail("")
    setPassword("")

    setTimeout(() => {
      onSignupSuccess()
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignup()
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription>Join Hospital Emergency Tracker</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 p-3 rounded-md">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 p-3 rounded-md">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{success}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <Button onClick={handleSignup} className="w-full" size="lg">
            Create Account
          </Button>

          <Button onClick={onGoToLogin} variant="outline" className="w-full bg-transparent" size="lg">
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
