import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { controlNumber, noteText, accountNumber } = body

    const payload = {
      controlNumber,
      noteText,
      accountNumber,
      noteAuthor: body.noteAuthor, 
    }

    const response = await axios.post("https://www.crainvision.com/api/notes", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    return NextResponse.json({ success: true, data: response.data }, { status: 200 })
  } catch (err: any) {
    console.error("Note submission failed:", err?.response?.data || err.message)
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 })
  }
}
