"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LogoIcon from "@/public/assests/tsx/logo";
import { useTheme } from "next-themes";
import CollapseLogo from "@/public/assests/tsx/collapseLogo";
import OverviewIcon from "@/public/assests/tsx/overviewIcon";
import TrolleyIcon from "@/public/assests/tsx/trolleyIcon";
import BlackUserIcon from "@/public/assests/tsx/blackUserIcon";
import FilterIcon from "@/public/assests/tsx/filterIcon";
import SettingIcon from "@/public/assests/tsx/settingIcon";
import LogoutIcon from "@/public/assests/tsx/logoutIcon";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

export function DashboardSidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: any;
  setMobileOpen: any;
}) {
  const [collapsed, setCollapsed] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();

  const mainNavItems: NavItem[] = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: <OverviewIcon fillColor={theme === "dark" ? "white" : "black"} />,
      isActive: pathname === "/dashboard",
    },
    {
      title: "Inventory",
      href: "/dashboard/inventory",
      icon: <TrolleyIcon fillColor={theme === "dark" ? "white" : "black"} />,
      isActive: pathname.startsWith("/dashboard/inventory"),
    },
    {
      title: "Service",
      href: "/dashboard/service",
      icon: <FilterIcon fillColor={theme === "dark" ? "white" : "black"} />,
      isActive: pathname.startsWith("/dashboard/service"),
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: <BlackUserIcon fillColor={theme === "dark" ? "white" : "black"} />,
      isActive: pathname.startsWith("/dashboard/customers"),
    },
  ];

  const settingsNavItems: NavItem[] = [
    {
      title: "My Profile",
      href: "/dashboard/profile",
      icon: <SettingIcon fillColor={theme === "dark" ? "white" : "black"} />,
      isActive: pathname === "/dashboard/profile",
    },
    {
      title: "Preference",
      href: "/dashboard/preferences",
      icon: <FilterIcon fillColor={theme === "dark" ? "white" : "black"} />,
      isActive: pathname === "/dashboard/preferences",
    },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const renderMenuItem = (item: NavItem, isSettings = false) => {
    const menuItem = (
      <Link
        href={item.href}
        className={cn(
          "flex items-center rounded-md py-4 text-sm font-medium hover:bg-brand-muted gap-2",
          collapsed ? "justify-center px-2" : "px-3",
          item.isActive
            ? "bg-brand-muted text-brand font-bold"
            : "text-foreground hover:bg-brand-muted"
        )}
      >
        {item.icon}
        {!collapsed && item.title}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{menuItem}</TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-[#7B57E0] text-white border-none rounded-md py-2 px-3"
          >
            {item.title}
          </TooltipContent>
        </Tooltip>
      );
    }

    return menuItem;
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 hidden h-full border-border border-r border-t border-b rounded-tr-[1rem] rounded-br-[1rem] bg-background  md:flex md:flex-col",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex items-center p-4 py-5">
          {!collapsed && (
            <LogoIcon fillColor={theme === "dark" ? "white" : "black"} />
          )}
          {collapsed && (
            <CollapseLogo
              fillColor={theme === "dark" ? "white" : "black"}
              className="h-8 w-8 mx-auto"
            />
          )}
        </div>

        <div className="flex-1 px-3 py-2">
          <div className="mb-2 text-xs font-medium text-[#7B57E0]">
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center">Main</div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-[#7B57E0] text-white border-none rounded-md py-2 px-3"
                >
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

          <div className="my-6 mx-2">
            <div className="h-[1px] bg-gray-200"></div>
          </div>

          <div className="mb-2 text-xs font-medium text-[#7B57E0]">
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center">Settings</div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-[#7B57E0] text-white border-none rounded-md py-2 px-3"
                >
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

          <div className="my-6 mx-2">
            <div className="h-[1px] bg-gray-200"></div>
          </div>
        </div>

        <div className="p-3">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/logout"
                  className="flex items-center justify-center rounded-md py-2 text-sm font-medium text-[#FF3B30] hover:bg-gray-100 px-2"
                >
                  <LogoutIcon />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-[#7B57E0] text-white border-none rounded-md py-2 px-3"
              >
                Logout Account
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              href="/logout"
              className="flex items-center rounded-md py-2 text-sm font-medium text-[#FF3B30] hover:bg-gray-100 px-3"
            >
              <LogoutIcon className="mr-2" />
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
                  <Image
                    src="/svgs/collapse-b.svg"
                    alt="Expand"
                    height={20}
                    width={20}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-[#7B57E0] text-white border-none rounded-md py-2 px-3"
              >
                Expand Menu
              </TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={toggleSidebar}
              className="mt-2 flex w-full items-center rounded-md bg-[#F4F0FF] py-3 text-sm font-medium text-[#7B57E0] px-3"
            >
              <Image
                src="/svgs/collapse-a.svg"
                alt="Collapse"
                height={20}
                width={20}
                className="mr-2"
              />
              Collapse Menu
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            <div className="flex items-center p-4">
              <Image
                src="/svgs/logo.svg"
                alt="CrainVision Logo"
                height={180}
                width={180}
              />
            </div>

            <div className="flex-1 px-3 py-2">
              <div className="mb-2 text-xs font-medium text-[#7B57E0]">
                Main
              </div>
              <nav className="space-y-1">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium gap-2",
                      item.isActive
                        ? "bg-[#F4F0FF] text-[#7B57E0]"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </nav>

              <div className="my-6 mx-2">
                <div className="h-[1px] bg-gray-200"></div>
              </div>

              <div className="mb-2 text-xs font-medium text-[#7B57E0]">
                Settings
              </div>
              <nav className="space-y-1">
                {settingsNavItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium gap-2",
                      item.isActive
                        ? "bg-[#F4F0FF] text-[#7B57E0]"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </nav>

              <div className="my-6 mx-2">
                <div className="h-[1px] bg-gray-200"></div>
              </div>
            </div>

            <div className="p-3">
              <Link
                href="/logout"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-[#FF3B30] hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                <Image
                  src="/svgs/log-out.svg"
                  alt="Logout"
                  height={15}
                  width={15}
                  className="mr-2 h-4 w-4"
                />
                Logout Account
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}
