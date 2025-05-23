import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      value,
      defaultValue,
      onChange,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    return (
      <input
        type={type}
        ref={ref}
        value={isControlled ? value : undefined}
        defaultValue={!isControlled ? defaultValue : undefined}
        onChange={handleChange}
        className={cn(
          "flex h-[64px] w-full rounded-lg border border-[#DCDCDD] bg-white px-3 py-2 text-base shadow-sm ring-offset-background placeholder:text-[#C0C0C0] focus-visible:outline-none focus-visible:border-crain-purple focus-visible:ring-1 focus-visible:ring-crain-purple focus:bg-[#F4F0FF] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
