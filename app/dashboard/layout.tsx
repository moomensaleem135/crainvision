"use client"

import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar"
import type React from "react"
import { useState, useEffect } from "react"

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Check if sidebar is collapsed by checking its width
  useEffect(() => {
    const checkSidebarState = () => {
      const sidebarElement = document.querySelector('[class*="w-16"]')
      setSidebarCollapsed(!!sidebarElement)
    }

    // Initial check
    checkSidebarState()

    // Set up a mutation observer to watch for class changes
    const observer = new MutationObserver(checkSidebarState)
    const sidebar = document.querySelector('div[class*="fixed inset-y-0 left-0"]')

    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "md:ml-16" : "md:ml-64"}`}>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
