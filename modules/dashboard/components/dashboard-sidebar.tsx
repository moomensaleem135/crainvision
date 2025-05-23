"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CuboidIcon, LogOut, PanelLeft, Settings, ShoppingBag, User, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  isActive?: boolean
}

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const pathname = usePathname()

  const mainNavItems: NavItem[] = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: CuboidIcon,
      isActive: pathname === "/dashboard",
    },
    {
      title: "Inventory",
      href: "/dashboard/inventory",
      icon: ShoppingBag,
      isActive: pathname.startsWith("/dashboard/inventory"),
    },
    {
      title: "Service",
      href: "/dashboard/service",
      icon: Settings,
      isActive: pathname.startsWith("/dashboard/service"),
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: Users,
      isActive: pathname.startsWith("/dashboard/customers"),
    },
  ]

  const settingsNavItems: NavItem[] = [
    {
      title: "My Profile",
      href: "/dashboard/profile",
      icon: User,
      isActive: pathname === "/dashboard/profile",
    },
    {
      title: "Preference",
      href: "/dashboard/preferences",
      icon: Settings,
      isActive: pathname === "/dashboard/preferences",
    },
  ]

  // Toggle sidebar for desktop
  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 hidden h-full border-r bg-white transition-all duration-300 md:flex md:flex-col",
          collapsed ? "w-16" : "w-64",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-center p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-600">
            <CuboidIcon className="h-4 w-4 text-white" />
          </div>
          {!collapsed && <span className="ml-2 text-lg font-bold">CrainVision</span>}
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-3 py-2">
          {!collapsed && <div className="mb-2 text-xs font-medium text-purple-400">Main</div>}
          {collapsed && <div className="mb-2 h-4"></div>}
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md py-2 text-sm font-medium",
                  collapsed ? "justify-center px-2" : "px-3",
                  item.isActive ? "bg-purple-100 text-purple-600" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <item.icon
                  className={cn("h-4 w-4", item.isActive ? "text-purple-600" : "text-gray-500", !collapsed && "mr-2")}
                />
                {!collapsed && item.title}
              </Link>
            ))}
          </nav>

          {/* Settings Navigation */}
          {!collapsed && <div className="mb-2 mt-6 text-xs font-medium text-purple-400">Settings</div>}
          {collapsed && <div className="mb-2 mt-6 h-4"></div>}
          <nav className="space-y-1">
            {settingsNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md py-2 text-sm font-medium",
                  collapsed ? "justify-center px-2" : "px-3",
                  item.isActive ? "bg-purple-100 text-purple-600" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <item.icon
                  className={cn("h-4 w-4", item.isActive ? "text-purple-600" : "text-gray-500", !collapsed && "mr-2")}
                />
                {!collapsed && item.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t p-3">
          <Link
            href="/logout"
            className={cn(
              "flex items-center rounded-md py-2 text-sm font-medium text-red-600 hover:bg-gray-100",
              collapsed ? "justify-center px-2" : "px-3",
            )}
          >
            <LogOut className={cn("h-4 w-4 text-red-600", !collapsed && "mr-2")} />
            {!collapsed && "Logout Account"}
          </Link>
          <button
            onClick={toggleSidebar}
            className={cn(
              "mt-2 flex w-full items-center rounded-md bg-purple-50 py-2 text-sm font-medium text-purple-600",
              collapsed ? "justify-center px-2" : "px-3",
            )}
          >
            <PanelLeft className={cn("h-4 w-4", !collapsed && "mr-2")} />
            {!collapsed && "Collapse Menu"}
          </button>
        </div>
      </div>

      {/* Mobile Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-40 md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <PanelLeft className="h-5 w-5" />
      </Button>

      {/* Mobile Drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex items-center p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-600">
                <CuboidIcon className="h-4 w-4 text-white" />
              </div>
              <span className="ml-2 text-lg font-bold">CrainVision</span>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 px-3 py-2">
              <div className="mb-2 text-xs font-medium text-purple-400">Main</div>
              <nav className="space-y-1">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      item.isActive ? "bg-purple-100 text-purple-600" : "text-gray-700 hover:bg-gray-100",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className={cn("mr-2 h-4 w-4", item.isActive ? "text-purple-600" : "text-gray-500")} />
                    {item.title}
                  </Link>
                ))}
              </nav>

              {/* Settings Navigation */}
              <div className="mb-2 mt-6 text-xs font-medium text-purple-400">Settings</div>
              <nav className="space-y-1">
                {settingsNavItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      item.isActive ? "bg-purple-100 text-purple-600" : "text-gray-700 hover:bg-gray-100",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className={cn("mr-2 h-4 w-4", item.isActive ? "text-purple-600" : "text-gray-500")} />
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="border-t p-3">
              <Link
                href="/logout"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                <LogOut className="mr-2 h-4 w-4 text-red-600" />
                Logout Account
              </Link>
              <button
                onClick={() => {
                  toggleSidebar()
                  setMobileOpen(false)
                }}
                className="mt-2 flex w-full items-center rounded-md bg-purple-50 px-3 py-2 text-sm font-medium text-purple-600"
              >
                <PanelLeft className="mr-2 h-4 w-4" />
                Collapse Menu
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
