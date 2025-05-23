"use client";

import type * as React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { UserProfileDropdown } from "./user-profile-dropdown";

export function Header({
  mobileOpen,
  setNotificationsOpen,
  setMobileOpen,
}: {
  mobileOpen: any;
  setNotificationsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onMenuClick?: () => void;
  setMobileOpen?: any;
}) {
  return (
    <header className="flex h-16 items-center justify-between bg-background px-4 md:px-6 py-10">
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="border"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </div>

      <div className="hidden md:block md:flex-1"></div>

      <div className="relative w-full sm:max-w-[20rem] md:max-w-md max-w-[10rem] mx-auto sm:ml-3 ml-2">
        <Image
          src={"/svgs/search.svg"}
          alt=""
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          height={20}
          width={20}
        />
        <Input
          type="search"
          placeholder="Search Dashboard"
          className="w-full border-gray-200 pl-9 pr-4 py-1 rounded-md md:h-14 h-12"
        />
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-2 md:ml-4 flex-shrink-0 md:flex-1 justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="border relative"
          onClick={() => setNotificationsOpen(true)}
        >
          <Image src={"/svgs/noti.svg"} alt="" height={25} width={25} />
          <span className="sr-only">Notifications</span>
        </Button>
        <ThemeSwitcher />
        <UserProfileDropdown />
      </div>
    </header>
  );
}
