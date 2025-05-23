import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[64px] w-full rounded-lg border border-[#DCDCDD] bg-white px-3 py-2 focus:border-[#7B57E0] focus:ring-[#7B57E0] text-base shadow-sm ring-offset-background placeholder:text-[#C0C0C0] focus-visible:outline-none focus-visible:border-crain-purple focus-visible:ring-1 focus-visible:ring-crain-purple disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onFocus={(e) => (e.target.style.backgroundColor = "#F4F0FF")}
        onBlur={(e) => (e.target.style.backgroundColor = "")}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
