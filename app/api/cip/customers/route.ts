import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const jwtToken = cookieStore.get("jwt")?.value

    if (!jwtToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(`${apiUrl}dealership/cit-report`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
        "ngrok-skip-browser-warning": "true",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({ error: errorData.message || "Failed to fetch customers" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("CIP customers API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
