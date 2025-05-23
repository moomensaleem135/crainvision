'use client';

import { useState } from "react";
import axios from "axios";
import { RegisterForm } from "../../components/registerForm";
import RightSide from "../../components/rightSide";
import { useToast } from "@/hooks/use-toast";
export default function AuthContainer() {
   const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    full_name: '',
    email: '',
    password: ''
  });

  const handleApiCall = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not defined in environment variables");
      }
      
      const res = await axios.post(`${apiUrl}users/`, userData);
      if (res) {
        console.log({ res });
            toast({
        title: "Registration successful",
        description: "Welcome to CrainVision",
      });

      // router.push("/preferences");

      }
      console.log({userData});
      
    } catch (err:any) {
      setError(err.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen">
      <div className="max-w-7xl flex-1 px-8">
        <RegisterForm userData= {userData} handleApiCall={handleApiCall} setUserData={setUserData} />
      </div>
      <RightSide />
    </main>
  );
}
