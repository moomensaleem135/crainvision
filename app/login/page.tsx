import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <div className="flex flex-1 items-center justify-center bg-muted p-6 md:p-10">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
          <div className="flex flex-col space-y-2 text-center">
            <Image
              src="/placeholder.svg?height=60&width=200"
              alt="CrainVision Logo"
              width={200}
              height={60}
              className="mx-auto"
            />
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your dashboard</p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden flex-1 bg-gray-900 md:block">
        <div className="relative h-full w-full">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Automotive dashboard"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-10 left-10 max-w-md text-white">
            <h2 className="text-2xl font-bold">CrainVision Automotive Solutions</h2>
            <p className="mt-2">Streamlined dashboards and analytics for the automotive industry</p>
          </div>
        </div>
      </div>
    </div>
  )
}
