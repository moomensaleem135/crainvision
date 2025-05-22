import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[64px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base shadow-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:border-crain-purple focus-visible:ring-1 focus-visible:ring-crain-purple disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
