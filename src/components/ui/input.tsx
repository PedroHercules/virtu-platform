import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "default" | "xs" | "sm" | "md" | "lg" | "textarea";
  label?: string;
}

const inputSizes = {
  xs: "h-6 text-xs px-2",
  sm: "h-8 text-sm px-2",
  default: "h-10 text-base px-3",
  md: "h-12 text-lg px-4",
  lg: "h-14 text-xl px-4",
  textarea: "h-32 py-2 px-3 resize-y",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize = "md", label, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPasswordType = type === "password";

    const togglePassword = () => {
      setShowPassword((prev) => !prev);
    };
    return (
      <div className="flex flex-col gap-1.5">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <div className="relative">
          <input
            type={isPasswordType ? (showPassword ? "text" : "password") : type}
            className={cn(
              "flex w-full rounded-md border border-border bg-input text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              inputSizes[inputSize],
              className
            )}
            ref={ref}
            {...props}
          />
          {isPasswordType && (
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
