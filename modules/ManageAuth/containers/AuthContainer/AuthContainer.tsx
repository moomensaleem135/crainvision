"use client"

import { useState } from "react"
import axios from "axios"
import RightSide from "../../components/rightSide"
import { useToast } from "@/hooks/use-toast"
import { LoginForm } from "../../components/loginForm"
import { useRouter } from "next/navigation"

export default function AuthContainer() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const handleApiCall = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      localStorage.setItem("userEmail", userData.email)

      if (data.user) {
        localStorage.setItem("userSession", JSON.stringify(data.user))
      }

      toast({
        title: "Login successful",
        description: "Welcome back to CrainVision",
      })

      const hasCompletedPreferences = localStorage.getItem("fullName")
      if (hasCompletedPreferences) {
        window.location.href = "/dashboard"
      } else {
        window.location.href = "/preferences"
      }
    } catch (err: any) {
      console.error("Login error:", err)

      let errorMessage = "Login failed. Please try again."
      if (err.message) {
        errorMessage = err.message
      }

      setError(errorMessage)
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen">
      <div className="max-w-7xl flex-1 px-8">
        <LoginForm userData={userData} handleApiCall={handleApiCall} setUserData={setUserData} loading={loading} error={error} />
      </div>
      <RightSide />
    </main>
  )
}
