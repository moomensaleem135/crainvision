"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LogOut, Settings, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LogoutIcon from "@/public/assests/tsx/logoutIcon";
import { useTheme } from "next-themes";
import SettingIcon from "@/public/assests/tsx/settingIcon";
import PreferenceIcon from "@/public/assests/tsx/preferenceIcon";

interface UserProfileDropdownProps {
  name?: string;
  userEmail?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

export function UserProfileDropdown({
  name: initialUserName = "Daphne Smith",
  userEmail: initialUserEmail = "daphnesmith@gmail.com",
  userAvatar = "/svgs/ellipse.svg",
  onLogout = () => {},
}: UserProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState(initialUserName);
  const [userEmail, setUserEmail] = useState(initialUserEmail);
  const router= useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsed = JSON.parse(storedUserData);
        if (parsed.full_name) setUserName(parsed.full_name);
        if (parsed.email) setUserEmail(parsed.email);
      } catch {}
    }
  }, []);

  const handlePreferenceClick = () => {
    setOpen(false); 
    setTimeout(() => {
      router.push("/dashboard/preferences"); 
    }, 0);
  };
  
  const handleProfileClick = () => {
    setOpen(false); 
    setTimeout(() => {
      router.push("/dashboard/profile"); 
    }, 0);
  };
  

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="overflow-hidden rounded-full cursor-pointer">
          <Image
            src={userAvatar || "/placeholder.svg"}
            alt="User avatar"
            height={40}
            width={40}
            className="h-full w-full object-cover"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-0">
        <div className="p-4 border-b">
          <p className="font-medium text-purple-600 text-lg">{userName}</p>
          <p className="text-gray-400 text-sm">{userEmail}</p>
        </div>
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full justify-start px-2 py-2 h-auto"
            onClick={handlePreferenceClick}
          >
            <div className="flex items-center">
              <div className="mr-2">
              <PreferenceIcon fillColor={theme === "dark" ? "white" : "black"} />
              </div>
              <span className="font-medium">Preference</span>
            </div>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-2 py-2 h-auto"
            onClick={handleProfileClick}
          >
            <div className="flex items-center">
              <div className="mr-2">
              <SettingIcon fillColor={theme === "dark" ? "white" : "black"} />
              </div>
              <span className="font-medium">My Profile</span>
            </div>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-2 py-2 h-auto"
            onClick={onLogout}
          >
            <div className="flex items-center">
              <div className="mr-2">
              <LogoutIcon fillColor={theme === "dark" ? "white" : "black"}/>
              </div>
              <span className="font-medium">Logout</span>
            </div>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
