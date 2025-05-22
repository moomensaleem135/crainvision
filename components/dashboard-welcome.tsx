"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardWelcome() {
  const [greeting, setGreeting] = useState("")
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      if (hour < 12) setGreeting("Good morning")
      else if (hour < 18) setGreeting("Good afternoon")
      else setGreeting("Good evening")

      const now = new Date()
      setCurrentTime(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      )
    }

    updateGreeting()
    const interval = setInterval(updateGreeting, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{greeting}, John</CardTitle>
        <CardDescription>{currentTime}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Welcome to your CrainVision dashboard. Here's an overview of your automotive business.</p>
      </CardContent>
    </Card>
  )
}
