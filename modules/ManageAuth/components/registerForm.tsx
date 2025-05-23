"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordStrengthBar from "react-password-strength-bar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
export function RegisterForm({ userData, handleApiCall, setUserData }: { userData: any, handleApiCall: any, setUserData: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { password, ...userDataWithoutPassword } = userData; 
    localStorage.setItem("userData", JSON.stringify(userDataWithoutPassword));
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration successful",
        description: "Welcome to CrainVision",
      });

      router.push("/preferences");
    }, 1500);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-16 justify-center">
      <div className="max-w-xl mx-auto w-full">
        {/* Logo */}
        <div className="mb-16">
          <Image src={"/svgs/logo.svg"} alt={""} height={250} width={250} />
        </div>

        {/* Welcome Text */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            👋 Welcome to <span className="text-[#7B57E0]">Crain Vision</span>
          </h1>
          <p className="text-gray-600 text-sm">
            Kindly fill in your details below to create an account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full Name:
            </label>
            <div className="relative">
              <Input
                id="fullName"
                type="text"
                placeholder="Enter name"
                className="pl-10 border border-gray-200 rounded-md focus:border-[#7B57E0] focus:ring-[#7B57E0]"
                onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Image src={"/svgs/user.svg"} alt="" height={24} width={24} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address:
            </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                className="pl-10 border border-gray-200 rounded-md focus:border-[#7B57E0] focus:ring-[#7B57E0]"
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Image src={"/svgs/mail.svg"} alt="" height={23} width={23} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="pl-10 pr-10 border border-gray-200 rounded-md focus:border-[#7B57E0] focus:ring-[#7B57E0]"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setUserData({ ...userData, password: e.target.value });
                }}
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Image src={"/svgs/lock.svg"} alt="" height={23} width={23} />
              </div>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {password.length > 0 && (
              <PasswordStrengthBar
                password={password}
                barColors={["#ddd", "#ef4836", "#f6b44d", "#2D1B81", "#25c281"]}
                onChangeScore={(score) => setPasswordScore(score)}
                style={{ marginTop: "12px" }}
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#7B57E0] hover:bg-[#7B57E0] text-white py-3 px-4 rounded-md transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/dashboard"
              className="text-[#7B57E0] hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>

        {/* <div className="mt-6 flex items-center justify-center">
          <div className="border-t border-gray-200 flex-grow mr-3"></div>
          <span className="text-sm text-[#7B57E0]">Or</span>
          <div className="border-t border-gray-200 flex-grow ml-3"></div>
        </div>

        <button
          type="button"
          className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 px-4 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Image src={"/svgs/google.svg"} alt="" height={23} width={23} />
          Sign in with Google
        </button> */}
      </div>
    </div>
  );
}
