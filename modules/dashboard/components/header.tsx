import type * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export function Header({setNotificationsOpen}: {setNotificationsOpen: React.Dispatch<React.SetStateAction<boolean>>}) {

  return (
    
   <header className="flex h-16 items-center justify-between  bg-background px-4 md:px-6 py-10">
          <div className="flex-1"></div>
          <div className="relative w-full max-w-2xl">
            <Image src={'/svgs/search.svg'} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" height={20} width={20}/>
            <Input
              type="search"
              placeholder="Search Dashboard"
              className="w-full border-gray-200 pl-9 pr-4 py-1 rounded-md h-14"
            />
          </div>
          <div className="flex items-center gap-4 ml-4 flex-1 justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="border relative"
              onClick={() => setNotificationsOpen(true)}
            >
              <Image src={'/svgs/noti.svg'} alt="" height={25} width={25}  />
           
            </Button>
            <Button variant="ghost" size="icon" className="border">
            <Image src={'/svgs/brightness.svg'} alt="" height={25} width={25} />
            </Button>
            <div className=" overflow-hidden rounded-full cursor-pointer">
              <Image src={'/svgs/ellipse.svg'}  alt="User avatar"  height={25} width={25} className="h-full w-full object-cover" />
            </div>
          </div>
        </header>
  )
}
