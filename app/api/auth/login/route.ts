import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(`${apiUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({ error: errorData.message || "Login failed" }, { status: response.status })
    }

    const data = await response.json()

    const setCookieHeader = response.headers.get("set-cookie")
    let jwtToken = null

    if (setCookieHeader) {
      const jwtMatch = setCookieHeader.match(/jwt=([^;]+)/)
      if (jwtMatch) {
        jwtToken = jwtMatch[1]
      }
    }

    if (data.token) {
      jwtToken = data.token
    }

    if (jwtToken) {
      const cookieStore = await cookies()
      cookieStore.set("jwt", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, 
        path: "/",
      })
    }

    return NextResponse.json({
      success: true,
      user: data.user || { email },
    })
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
