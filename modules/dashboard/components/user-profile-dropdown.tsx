"use client"

import { useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { LogOut, Settings, SlidersHorizontal } from "lucide-react"

interface UserProfileDropdownProps {
  name?: string
  userEmail?: string
  userAvatar?: string
  onLogout?: () => void
  onProfileClick?: () => void
  onPreferenceClick?: () => void
}

export function UserProfileDropdown({
  name: initialUserName = "Daphne Smith",
  userEmail: initialUserEmail = "daphnesmith@gmail.com",
  userAvatar = "/svgs/ellipse.svg",
  onLogout = () => console.log("Logout clicked"),
  onProfileClick = () => console.log("Profile clicked"),
  onPreferenceClick = () => console.log("Preference clicked"),
}: UserProfileDropdownProps) {
  const [open, setOpen] = useState(false)

  const [userName, setUserName] = useState(initialUserName)
  const [userEmail, setUserEmail] = useState(initialUserEmail)

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      try {
        const parsed = JSON.parse(storedUserData)
        if (parsed.full_name) setUserName(parsed.full_name)
        if (parsed.email) setUserEmail(parsed.email)
      } catch {
        // ignore JSON parse errors
      }
    }
  }, [])

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
          <Button variant="ghost" className="w-full justify-start px-2 py-2 h-auto" onClick={onPreferenceClick}>
            <div className="flex items-center">
              <div className="bg-gray-100 p-1 rounded-md mr-2">
                <SlidersHorizontal className="h-5 w-5" />
              </div>
              <span className="font-medium">Preference</span>
            </div>
          </Button>
          <Button variant="ghost" className="w-full justify-start px-2 py-2 h-auto" onClick={onProfileClick}>
            <div className="flex items-center">
              <div className="bg-gray-100 p-1 rounded-md mr-2">
                <Settings className="h-5 w-5" />
              </div>
              <span className="font-medium">My Profile</span>
            </div>
          </Button>
          <Button variant="ghost" className="w-full justify-start px-2 py-2 h-auto text-red-500" onClick={onLogout}>
            <div className="flex items-center">
              <div className="bg-red-50 p-1 rounded-md mr-2">
                <LogOut className="h-5 w-5 text-red-500" />
              </div>
              <span className="font-medium">Logout</span>
            </div>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
