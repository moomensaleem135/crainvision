import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const jwtToken = cookieStore.get("jwt")?.value

    if (!jwtToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const accountType = searchParams.get("accountType") || "all"

    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const backendUrl = new URL(`${apiUrl}dealership/cit-report`)

    backendUrl.searchParams.append("accountType", accountType)

    const response = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({ error: errorData.message || "Failed to fetch customers" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("CIT customers API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
