"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Car,
  ChevronDown,
  Cog,
  DollarSign,
  Home,
  Package,
  PanelLeft,
  ShoppingCart,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  submenu?: NavItem[]
}

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Inventory",
      href: "/dashboard/inventory",
      icon: Package,
      submenu: [
        {
          title: "Vehicles",
          href: "/dashboard/inventory/vehicles",
          icon: Car,
        },
        {
          title: "Parts",
          href: "/dashboard/inventory/parts",
          icon: Cog,
        },
      ],
    },
    {
      title: "Sales",
      href: "/dashboard/sales",
      icon: ShoppingCart,
      submenu: [
        {
          title: "Transactions",
          href: "/dashboard/sales/transactions",
          icon: DollarSign,
        },
        {
          title: "Analytics",
          href: "/dashboard/sales/analytics",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      title: "Preferences",
      href: "/dashboard/preferences",
      icon: Cog,
    },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div
      className={`relative flex h-screen flex-col border-r bg-background transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-16 items-center justify-end border-b px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft className={`h-5 w-5 transition-all ${collapsed ? "rotate-180" : ""}`} />
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          <TooltipProvider delayDuration={0}>
            {navItems.map((item, index) => (
              <div key={index}>
                {item.submenu ? (
                  <Collapsible className="w-full">
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${pathname.startsWith(item.href) ? "bg-muted" : ""}`}
                      >
                        {collapsed ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <item.icon className="h-5 w-5" />
                            </TooltipTrigger>
                            <TooltipContent side="right">{item.title}</TooltipContent>
                          </Tooltip>
                        ) : (
                          <>
                            <item.icon className="mr-2 h-5 w-5" />
                            <span className="flex-1 text-left">{item.title}</span>
                            <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className={collapsed ? "hidden" : ""}>
                      <div className="ml-6 mt-1 space-y-1">
                        {item.submenu.map((subitem, subindex) => (
                          <Link
                            key={subindex}
                            href={subitem.href}
                            className={`flex items-center rounded-md px-3 py-2 text-sm ${
                              isActive(subitem.href) ? "bg-muted font-medium" : "hover:bg-muted/50"
                            }`}
                          >
                            <subitem.icon className="mr-2 h-4 w-4" />
                            <span>{subitem.title}</span>
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link href={item.href}>
                    <Button variant="ghost" className={`w-full justify-start ${isActive(item.href) ? "bg-muted" : ""}`}>
                      {collapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <item.icon className="h-5 w-5" />
                          </TooltipTrigger>
                          <TooltipContent side="right">{item.title}</TooltipContent>
                        </Tooltip>
                      ) : (
                        <>
                          <item.icon className="mr-2 h-5 w-5" />
                          <span>{item.title}</span>
                        </>
                      )}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </TooltipProvider>
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            <p>CrainVision Automotive</p>
            <p>Version 1.0.0</p>
          </div>
        )}
      </div>
    </div>
  )
}
