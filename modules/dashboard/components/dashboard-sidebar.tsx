"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavItem {
  title: string
  href: string
  icon: string
  isActive?: boolean
}

export function DashboardSidebar({ mobileOpen, setMobileOpen }: { mobileOpen: any; setMobileOpen: any }) {
  const [collapsed, setCollapsed] = React.useState(false)
//   const [mobileOpen, setMobileOpen] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const mainNavItems: NavItem[] = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: "/svgs/overview.svg",
      isActive: pathname === "/dashboard",
    },
    {
      title: "Inventory",
      href: "/dashboard/inventory",
      icon: "/svgs/trolley.svg",
      isActive: pathname.startsWith("/dashboard/inventory"),
    },
    {
      title: "Service",
      href: "/dashboard/service",
      icon: "/svgs/filter.svg",
      isActive: pathname.startsWith("/dashboard/service"),
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: "/svgs/black-user.svg",
      isActive: pathname.startsWith("/dashboard/customers"),
    },
  ]

  const settingsNavItems: NavItem[] = [
    {
      title: "My Profile",
      href: "/dashboard/profile",
      icon: "/svgs/setting.svg",
      isActive: pathname === "/dashboard/profile",
    },
    {
      title: "Preference",
      href: "/dashboard/preferences",
      icon: "/svgs/filter.svg",
      isActive: pathname === "/dashboard/preferences",
    },
  ]

  // Toggle sidebar for desktop
  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  // Render a menu item with tooltip when collapsed
  const renderMenuItem = (item: NavItem, isSettings = false) => {
    const menuItem = (
      <Link
        href={item.href}
        className={cn(
          "flex items-center rounded-md py-4 text-sm font-medium hover:bg-brand-muted",
          collapsed ? "justify-center px-2" : "px-3",
          item.isActive ? "bg-brand-muted text-brand font-bold" : "text-foreground hover:bg-brand-muted",
        )}
      >
        <Image
          src={item.icon || "/placeholder.svg"}
          alt={`${item.title} icon`}
          width={18}
          height={18}
          className={cn(item.isActive ? "text-brand " : "text-foreground", !collapsed && "mr-2")}
        />
        {!collapsed && item.title}
      </Link>
    )

    if (collapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{menuItem}</TooltipTrigger>
          <TooltipContent side="right" className="bg-[#7B57E0] text-white border-none rounded-md py-2 px-3">
            {item.title}
          </TooltipContent>
        </Tooltip>
      )
    }

    return menuItem
  }

  console.log({mobileOpen});
  
  return (
    <TooltipProvider>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 hidden h-full border-border border-r border-t border-b rounded-tr-[1rem] rounded-br-[1rem] bg-background  md:flex md:flex-col",
          collapsed ? "w-20" : "w-64",
        )}
      >
        {/* Logo */}
        <div className="flex items-center p-4 py-5">
          {!collapsed && <Image src="/svgs/logo.svg" alt="CrainVision Logo" height={180} width={180} />}
          {collapsed && <Image src="/svgs/collapse-logo.svg" alt="CrainVision Icon" height={50} width={50} className="h-8 w-8 mx-auto" />}
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-3 py-2">
          {/* Main Section Label */}
          <div className="mb-2 text-xs font-medium text-[#7B57E0]">
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center">Main</div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-[#7B57E0] text-white border-none rounded-md py-2 px-3">
                  Main
                </TooltipContent>
              </Tooltip>
            ) : (
              "Main"
            )}
          </div>

          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <div key={item.title}>{renderMenuItem(item)}</div>
            ))}
          </nav>

          {/* Divider before Settings */}
          <div className="my-6 mx-2">
            <div className="h-[1px] bg-gray-200"></div>
          </div>

          {/* Settings Navigation */}
          <div className="mb-2 text-xs font-medium text-[#7B57E0]">
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center">Settings</div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-[#7B57E0] text-white border-none rounded-md py-2 px-3">
                  Settings
                </TooltipContent>
              </Tooltip>
            ) : (
              "Settings"
            )}
          </div>

          <nav className="space-y-1">
            {settingsNavItems.map((item) => (
              <div key={item.title}>{renderMenuItem(item, true)}</div>
            ))}
          </nav>

          {/* Divider after Settings */}
          <div className="my-6 mx-2">
            <div className="h-[1px] bg-gray-200"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/logout"
                  className="flex items-center justify-center rounded-md py-2 text-sm font-medium text-[#FF3B30] hover:bg-gray-100 px-2"
                >
                  <Image src="/svgs/log-out.svg" alt="Logout" height={15} width={15} className="h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#7B57E0] text-white border-none rounded-md py-2 px-3">
                Logout Account
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              href="/logout"
              className="flex items-center rounded-md py-2 text-sm font-medium text-[#FF3B30] hover:bg-gray-100 px-3"
            >
              <Image src="/svgs/log-out.svg" alt="Logout" height={15} width={15} className="h-4 w-4 mr-2" />
              Logout Account
            </Link>
          )}

          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleSidebar}
                  className="mt-2 flex w-full items-center justify-center rounded-md bg-[#F4F0FF] py-3 text-sm font-medium text-[#7B57E0] px-2"
                >
                  <Image src="/svgs/collapse-b.svg" alt="Expand" height={20} width={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#7B57E0] text-white border-none rounded-md py-2 px-3">
                Expand Menu
              </TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={toggleSidebar}
              className="mt-2 flex w-full items-center rounded-md bg-[#F4F0FF] py-3 text-sm font-medium text-[#7B57E0] px-3"
            >
              <Image src="/svgs/collapse-a.svg" alt="Collapse" height={20} width={20} className="mr-2" />
              Collapse Menu
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex items-center p-4">
              <Image src="/svgs/logo.svg" alt="CrainVision Logo" height={180} width={180} />
            </div>

            {/* Main Navigation */}
            <div className="flex-1 px-3 py-2">
              <div className="mb-2 text-xs font-medium text-[#7B57E0]">Main</div>
              <nav className="space-y-1">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      item.isActive ? "bg-[#F4F0FF] text-[#7B57E0]" : "text-gray-700 hover:bg-gray-100",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Image
                      src={item.icon || "/placeholder.svg"}
                      alt={`${item.title} icon`}
                      width={16}
                      height={16}
                      className={cn("mr-2 h-4 w-4", item.isActive ? "text-[#7B57E0]" : "text-gray-500")}
                    />
                    {item.title}
                  </Link>
                ))}
              </nav>

              {/* Divider before Settings */}
              <div className="my-6 mx-2">
                <div className="h-[1px] bg-gray-200"></div>
              </div>

              {/* Settings Navigation */}
              <div className="mb-2 text-xs font-medium text-[#7B57E0]">Settings</div>
              <nav className="space-y-1">
                {settingsNavItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      item.isActive ? "bg-[#F4F0FF] text-[#7B57E0]" : "text-gray-700 hover:bg-gray-100",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Image
                      src={item.icon || "/placeholder.svg"}
                      alt={`${item.title} icon`}
                      width={16}
                      height={16}
                      className={cn("mr-2 h-4 w-4", item.isActive ? "text-[#7B57E0]" : "text-gray-500")}
                    />
                    {item.title}
                  </Link>
                ))}
              </nav>

              {/* Divider after Settings */}
              <div className="my-6 mx-2">
                <div className="h-[1px] bg-gray-200"></div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3">
              <Link
                href="/logout"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-[#FF3B30] hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                <Image src="/svgs/log-out.svg" alt="Logout" height={15} width={15} className="mr-2 h-4 w-4" />
                Logout Account
              </Link>
              {/* <button
                onClick={() => {
                  toggleSidebar()
                  setMobileOpen(false)
                }}
                className="mt-2 flex w-full items-center rounded-md bg-[#F4F0FF] px-3 py-3 text-sm font-medium text-[#7B57E0]"
              >
                <Image src="/svgs/collapse-a.svg" alt="Collapse" height={20} width={20} className="mr-2" />
                Collapse Menu
              </button> */}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  )
}
