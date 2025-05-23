"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CameraImage from "@/public/assests/tsx/cameraIcon";
import UserIcon from "@/public/assests/tsx/userIcon";
import EmailIcon from "@/public/assests/tsx/emailIcon";
import AvatarIcon from "@/public/assests/tsx/avatar";
import { usePathname, useRouter } from "next/navigation";
import RightArrowIcon from "@/public/assests/tsx/rightArrowIcon";

interface PreferencesFormProps {
  comeFrom: string;
}

export function PreferencesForm({ comeFrom }: PreferencesFormProps) {
  const { setTheme, theme } = useTheme();
  const { toast } = useToast();
  const router = useRouter();
   const pathname = usePathname();
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [tempTheme, setTempTheme] = useState<string>("system");
  const [selectedDashboard, setSelectedDashboard] = useState("automotive")
  const [hasChanges, setHasChanges] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<{ full_name?: string; email?: string }>({});

  // Initialize theme when component mounts
  useEffect(() => {
    // Use the current theme or system preference
    const currentTheme = theme || "system";
    setTempTheme(currentTheme);
  }, [theme]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Save preferences to localStorage
      localStorage.setItem("theme", tempTheme)
      localStorage.setItem("selectedDashboard", selectedDashboard)
      setTheme(tempTheme)

      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Preferences updated",
          description: "Your preferences have been saved successfully",
        })
        // Navigate to dashboard
        router.push("/dashboard")
      }, 1500)
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

 const handleThemeChange = (value: string) => {
  setTempTheme(value);
  setTheme(value);
  localStorage.setItem("theme", value);  // Save immediately
  setHasChanges(true);
};

  const handleDashboardChange = (value: string) => {
    if(value != ''){
      setSelectedDashboard(value);
      localStorage.setItem("selectedDashboard", value); // Save immediately
      setHasChanges(true);
    }
};

 useEffect(() => {
  if (pathname === "/dashboard/preferences") {
    const storedTheme = localStorage.getItem("theme");
    const storedDashboard = localStorage.getItem("selectedDashboard");

    if (storedTheme) {
      setTempTheme(storedTheme);
      setTheme(storedTheme);
    }
    if (storedDashboard) {
      setSelectedDashboard(storedDashboard);
    } else {
      // If nothing in localStorage, fallback to default
      setSelectedDashboard("automotive");
    }
  } else {
    const currentTheme = theme || "system";
    setTempTheme(currentTheme);
  }
}, [pathname, setTheme, theme]);

useEffect(() => {
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    try {
      setUserData(JSON.parse(storedUserData));
    } catch {
      // ignore JSON parse errors
    }
  }
}, []);


  return (
    <form onSubmit={handleSubmit} className="flex-1 p-4 md:p-6">
      {/* Single Card containing everything */}
      <Card className="overflow-hidden">
        {/* Main content area */}
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Profile Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-[#7B57E0]">
                Profile Information
              </h2>

              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileImage || ""} alt="Profile" />
                    <AvatarFallback className="text-lg bg-[#F4F0FF]">
                      <AvatarIcon />
                    </AvatarFallback>
                  </Avatar>
                  <label htmlFor="profile-image">
                    <CameraImage className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F4F0FF] text-white" />
                  </label>
                  <Input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name:</Label>
                  <div className="flex items-center gap-2 relative">
                    <UserIcon className="h-6 w-6 absolute left-5" />
                    <Input
                      id="name"
                      placeholder="Daphne Smith"
                      defaultValue="Daphne Smith"
                      disabled={isSaving}
                      className="pl-14 py-6"
                      value={userData?.full_name || ""}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address:</Label>
                  <div className="flex items-center gap-2 relative">
                    <EmailIcon className="h-6 w-6 absolute left-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="daphnesmith@gmail.com"
                      defaultValue="daphnesmith@gmail.com"
                      disabled={isSaving}
                      className="pl-14 py-6"
                       value={userData?.email || ""}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-language">Language:</Label>
                  <Select defaultValue="English">
                    <SelectTrigger id="default-language" className="py-6">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Right Column - Appearance & Preferences + Additional Settings */}
            <div className="space-y-4">
              {/* Appearance & Preferences Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#7B57E0]">
                  Appearance & Preferences
                </h2>

                <div className="space-y-4">
                  <RadioGroup
                    defaultValue="system"
                    value={tempTheme}
                    className="grid grid-cols-3 gap-4"
                    onValueChange={handleThemeChange}
                  >
                    <div className="space-y-2">
                      <div className="border rounded-lg p-2">
                        <img
                          src="/system-preferences.svg"
                          alt="System theme preview"
                          className="h-12 w-full object-cover rounded"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="system"
                          id="system-preference"
                          className="text-[#7B57E0]"
                        />
                        <Label htmlFor="system-preference" className="text-sm">
                          System Preference
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="border rounded-lg p-2">
                        <img
                          src="/light-theme.svg"
                          alt="Light theme preview"
                          className="h-12 w-full object-cover rounded"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="light"
                          id="light"
                          className="text-[#7B57E0]"
                        />
                        <Label htmlFor="light" className="text-sm">
                          Light
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="border rounded-lg p-2">
                        <img
                          src="/dark-theme.svg"
                          alt="Dark theme preview"
                          className="h-12 w-full object-cover rounded"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="dark"
                          id="dark"
                          className="text-[#7B57E0]"
                        />
                        <Label htmlFor="dark" className="text-sm">
                          Dark
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-dashboard">Favorite Dashboard:</Label>
                  <Select value={selectedDashboard} onValueChange={handleDashboardChange}>
                    <SelectTrigger id="default-dashboard" className="py-6">
                      <SelectValue placeholder="Select a dashboard" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automotive">Automative</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="service">Services</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-[#7B57E0]">
                    This dashboard will be shown first when you log in.
                  </p>
                </div>
              </div>

              {/* Additional Settings Section */}
              <div className="space-y-4 mt-6">
                <h2 className="text-xl font-semibold text-[#7B57E0]">
                  Additional Settings
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">
                        Enable Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about updates and alerts
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      defaultChecked
                      thumbClassName="data-[state=checked]:bg-[#7B57E0] data-[state=unchecked]:bg-[#C0C0C0]"
                      className="data-[state=unchecked]:bg-[#DCDCDD] data-[state=checked]:bg-[#DCDCDD]"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get email to find out what's going on when you're not
                        online.
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      defaultChecked={false}
                      thumbClassName="data-[state=checked]:bg-[#7B57E0] data-[state=unchecked]:bg-[#C0C0C0]"
                      className="data-[state=unchecked]:bg-[#DCDCDD] data-[state=checked]:bg-[#DCDCDD]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Button area */}
        <div
          className={`${
            comeFrom === "register"
              ? "p-6 flex justify-between w-full max-sm:flex-col max-sm:gap-4"
              : "p-6 flex justify-end"
          }`}
        >
          {comeFrom === "register" && (
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
              type="button"
            >
              Skip for Now
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading || !hasChanges}
            className="bg-[#7B57E0] text-white px-6"
          >
           {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Preferences
            <RightArrowIcon className="!h-6 !w-6" />
          </Button>
        </div>
      </Card>
    </form>
  );
}
