"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  category: "inventory" | "service" | "general";
}

interface NotificationsSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationsSidebar({
  open,
  onOpenChange,
}: NotificationsSidebarProps) {
  const [activeFilter, setActiveFilter] = React.useState<
    "all" | "unread" | "inventory" | "service"
  >("all");

  const notifications: Notification[] = [
    {
      id: "1",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "2 hours ago",
      isRead: false,
      category: "inventory",
    },
    {
      id: "2",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "2 hours ago",
      isRead: false,
      category: "inventory",
    },
    {
      id: "3",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "2 hours ago",
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
      timestamp: "2 hours ago",
      isRead: true,
      category: "inventory",
    },
    {
      id: "8",
      title: "New vehicle inventory update",
      description: "The Q2 vehicle inventory report is now available.",
      timestamp: "2 hours ago",
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
  ];

  const filteredNotifications = notifications.filter((notification) => {
    switch (activeFilter) {
      case "unread":
        return !notification.isRead;
      case "inventory":
        return notification.category === "inventory";
      case "service":
        return notification.category === "service";
      default:
        return true;
    }
  });

  const markAllAsRead = () => {};

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[1200px] p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="flex flex-row items-center justify-between border-b p-6 space-y-0">
            <SheetTitle className="text-xl font-semibold text-gray-900">
              Notifications
            </SheetTitle>
            <Button
              variant="default"
              size="sm"
              onClick={markAllAsRead}
              className="bg-[#5B25C0] text-white hover:bg-[#5B25C0] text-xs px-3 py-1 h-8"
            >
              <Check className="mr-1 h-3 w-3" />
              Mark all as Read
            </Button>
          </SheetHeader>

          <div className="border-b px-6 py-4">
            <div className="flex gap-2">
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
                    "rounded-full px-4 py-2 text-sm font-medium",
                    activeFilter === filter.key
                      ? "bg-[#5B25C0] text-white hover:bg-[#5B25C0]"
                      : "text-gray-600 hover:bg-gray-100 bg-transparent"
                  )}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-3 border-b px-6 py-4 hover:bg-gray-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5B25C0] text-white flex-shrink-0">
                  <div className="relative">
                    <div className="h-6 w-6 bg-[#5B25C0] rounded-sm"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">C</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-2">
                      <h4 className="text-sm font-semibold text-gray-900 leading-tight">
                        {notification.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                        {notification.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {notification.timestamp}
                      </span>
                      {!notification.isRead && (
                        <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-6">
            <Button className="w-full bg-[#5B25C0] text-white hover:bg-[#5B25C0] py-3 font-medium">
              Notification Settings
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
