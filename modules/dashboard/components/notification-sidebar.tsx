"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  title: string
  description: string
  timestamp: string
  isRead: boolean
  category: "inventory" | "service" | "general"
}

interface NotificationsSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationsSidebar({ open, onOpenChange }: NotificationsSidebarProps) {
  const [activeFilter, setActiveFilter] = React.useState<"all" | "unread" | "inventory" | "service">("all")

  const notifications: Notification[] = [
    {
      id: "1",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "3 hours ago",
      isRead: false,
      category: "inventory",
    },
    {
      id: "2",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "3 hours ago",
      isRead: false,
      category: "inventory",
    },
    {
      id: "3",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "3 hours ago",
      isRead: true,
      category: "inventory",
    },
    {
      id: "4",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "2 hours ago",
      isRead: false,
      category: "inventory",
    },
    {
      id: "5",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "2 hours ago",
      isRead: true,
      category: "inventory",
    },
    {
      id: "6",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "2 hours ago",
      isRead: false,
      category: "inventory",
    },
    {
      id: "7",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "3 hours ago",
      isRead: true,
      category: "inventory",
    },
    {
      id: "8",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "3 hours ago",
      isRead: true,
      category: "inventory",
    },
    {
      id: "9",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "2 hours ago",
      isRead: false,
      category: "inventory",
    },
    {
      id: "10",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "2 hours ago",
      isRead: true,
      category: "inventory",
    },
    {
      id: "11",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "2 hours ago",
      isRead: false,
      category: "inventory",
    },
    {
      id: "12",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "2 hours ago",
      isRead: true,
      category: "inventory",
    },
  ]

  const filteredNotifications = notifications.filter((notification) => {
    switch (activeFilter) {
      case "unread":
        return !notification.isRead
      case "inventory":
        return notification.category === "inventory"
      case "service":
        return notification.category === "service"
      default:
        return true
    }
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAllAsRead = () => {
    // In a real app, this would update the notifications state
    console.log("Mark all as read")
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] p-0">
        <div className="flex h-full flex-col">
          {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <SheetTitle className="text-lg font-semibold">Notifications</SheetTitle>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-600">
                  {unreadCount} New
                </Badge>
              )}
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={markAllAsRead}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              <Check className="mr-1 h-3 w-3" />
              Mark all as Read
            </Button>
          </SheetHeader>

          {/* Filter Tabs */}
          <div className="border-b p-4">
            <div className="flex gap-1">
              {[
                { key: "all", label: "All" },
                { key: "unread", label: "Unread" },
                { key: "inventory", label: "Inventory" },
                { key: "service", label: "Service" },
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.key as any)}
                  className={cn(
                    "rounded-full",
                    activeFilter === filter.key
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "text-gray-600 hover:bg-gray-100",
                  )}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 border-b p-4 hover:bg-gray-50">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-600 text-white">
                  <span className="text-sm font-bold">C</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                      <p className="mt-1 text-sm text-gray-500">{notification.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-xs text-gray-400">{notification.timestamp}</span>
                      {!notification.isRead && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t p-4">
            <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">Notification Settings</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
