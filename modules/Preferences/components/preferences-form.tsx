"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export function PreferencesForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate saving preferences
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Preferences updated",
        description: "Your preferences have been saved successfully",
      });
    }, 1500);
  };

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

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#7B57E0]">
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="w-full flex justify-center">
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
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name:</Label>
                <div className="flex items-center gap-2 relative">
                  <UserIcon className="h-6 w-6 absolute left-5" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    defaultValue="John Doe"
                    disabled={isLoading}
                    className="pl-14 py-6"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email:</Label>
                <div className="flex items-center gap-2 relative">
                  <EmailIcon className="h-6 w-6 absolute left-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@crainvision.com"
                    defaultValue="john@crainvision.com"
                    disabled={isLoading}
                    className="pl-14 py-6"
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#7B57E0]">
              Appearance & Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-6">
                <RadioGroup defaultValue="system" className="flex w-full">
                  <div className="flex-1">
                    <div className="mb-3">
                      <img
                        src="/system-preferences.svg"
                        alt="System theme preview"
                        className="h-32 w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="system"
                          id="system-preference"
                          className="text-[#7B57E0]"
                        />
                        <Label htmlFor="system-preference">
                          System Preference
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-3">
                      <img
                        src="/light-theme.svg"
                        alt="Light theme preview"
                        className="h-32 w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="light"
                          id="light"
                          className="text-[#7B57E0]"
                        />
                        <Label htmlFor="light">Light</Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-3">
                      <img
                        src="/dark-theme.svg"
                        alt="Dark theme preview"
                        className="h-32 w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="dark"
                          id="dark"
                          className="text-[#7B57E0]"
                        />
                        <Label htmlFor="dark">Dark</Label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-dashboard">Favorite Dashboard:</Label>
              <Select defaultValue="Overview">
                <SelectTrigger id="default-dashboard" className="py-6">
                  <SelectValue placeholder="Select a dashboard" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Overview">Overview</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="customers">Customers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#7B57E0]">
              Additional Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get email to find out what's going on when you're not online.
                </p>
              </div>
              <Switch
                id="email-notifications"
                defaultChecked
                thumbClassName="data-[state=checked]:bg-[#7B57E0] data-[state=unchecked]:bg-[#C0C0C0]"
                className="data-[state=unchecked]:bg-[#DCDCDD] data-[state=checked]:bg-[#DCDCDD]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Enable Notifications</Label>
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Skip for Now
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#7B57E0] text-white"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Preferences
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
