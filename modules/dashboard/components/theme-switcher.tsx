"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="border">
        <Image src={"/svgs/brightness.svg"} alt="" height={25} width={25} />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="border">
          <Image src={"/svgs/brightness.svg"} alt="" height={25} width={25} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="p-2">
          <div
            className={`p-2 rounded-md mb-2 cursor-pointer `}
            onClick={() => {
              setTheme("system");
            }}
          >
            <p className="font-medium">System Preference</p>
          </div>
          <div
            className={`p-2 rounded-md mb-2 cursor-pointer`}
            onClick={() => {
              setTheme("light");
            }}
          >
            <p className="font-medium">Light Mode</p>
          </div>
          <div
            className={`p-2 rounded-md cursor-pointer`}
            onClick={() => {
              setTheme("dark");
            }}
          >
            <p className="font-medium">Dark Mode</p>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
