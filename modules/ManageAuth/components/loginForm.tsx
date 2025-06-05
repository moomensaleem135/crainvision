"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function LoginForm({
  userData,
  handleApiCall,
  setUserData,
  loading,
  error,
}: {
  userData: any
  handleApiCall: any
  setUserData: any
  loading: boolean
  error?: string | null
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setFormErrors({})
    // Basic validation
    const errors: { email?: string; password?: string } = {}

    if (!userData.email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Please enter a valid email"
    }

    if (!userData.password) {
      errors.password = "Password is required"
    } else if (userData.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    await handleApiCall()
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-16 justify-center h-[100vh]">
      <div className="max-w-xl mx-auto w-full">
        <div className="mb-16">
          <Image
            src="/crainLogo.png"
            alt="CrainVision Logo"
            width={378}
            height={44}
            priority
            style={{ height: "44px", width: "auto" }}
          />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            👋 Welcome back to <span className="text-[#7B57E0]">Crain Vision</span>
          </h1>
          <p className="text-black text-md">Please sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address:
            </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                className={`pl-10 border rounded-md focus:border-[#7B57E0] focus:ring-[#7B57E0] ${
                  formErrors.email ? "border-red-300" : "border-gray-200"
                }`}
                value={userData.email}
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value })
                  if (formErrors.email) {
                    setFormErrors({ ...formErrors, email: undefined })
                  }
                }}
                disabled={loading}
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Image src={"/svgs/mail.svg"} alt="" height={23} width={23} />
              </div>
            </div>
            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className={`pl-10 pr-10 border rounded-md focus:border-[#7B57E0] focus:ring-[#7B57E0] ${
                  formErrors.password ? "border-red-300" : "border-gray-200"
                }`}
                value={userData.password}
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value })
                  if (formErrors.password) {
                    setFormErrors({ ...formErrors, password: undefined })
                  }
                }}
                disabled={loading}
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Image src={"/svgs/lock.svg"} alt="" height={23} width={23} />
              </div>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#7B57E0] hover:text-[#7B57E0]"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#7B57E0] hover:bg-[#6B47D0] text-white py-3 px-4 rounded-md transition-colors"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#7B57E0] hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-sm text-[#7B57E0] hover:underline">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  )
}
