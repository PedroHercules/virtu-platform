import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, InputHTMLAttributes, useState } from "react";

const inputVariants = cva(
  [
    // Base
    "peer w-full transition-colors duration-200 ease-linear",
    "text-foreground bg-transparent",
    "rounded-lg border border-accent/20",

    // Placeholder
    "placeholder:text-foreground/50",
    "placeholder:transition-opacity placeholder:duration-200",

    // Focus
    "focus-visible:outline-none",
    "focus-visible:ring-1",
    "focus-visible:ring-accent",
    "focus-visible:border-accent",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",

    // Disabled
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "disabled:bg-transparent",
    "disabled:border-border",
    "disabled:placeholder:text-foreground/30",

    // Invalid/Error
    "aria-[invalid=true]:border-primary",
    "aria-[invalid=true]:text-primary",
    "invalid:border-primary",
    "invalid:text-primary",
    "focus-visible:invalid:border-primary",
    "focus-visible:invalid:ring-primary",

    // File input reset
    "file:border-0",
    "file:bg-transparent",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        error: "border-primary text-primary focus-visible:ring-primary",
      },
      size: {
        sm: "h-8 px-3 py-1 text-xs",
        default: "h-10 px-4 py-2 text-sm",
        md: "h-12 px-4 py-3 text-base",
        lg: "h-14 px-6 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: string;
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      variant,
      size,
      error,
      label,
      startIcon,
      endIcon,
      fullWidth,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 11)}`;
    const errorId = `${inputId}-error`;
    const hasError = Boolean(error);
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className={cn("space-y-2", fullWidth ? "w-full" : "max-w-sm")}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-lg font-medium text-foreground/90"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-foreground/50">
              {startIcon}
            </div>
          )}
          <input
            type={isPassword && showPassword ? "text" : type}
            id={inputId}
            className={cn(
              inputVariants({
                variant: hasError ? "error" : variant,
                size,
              }),
              startIcon && "pl-10",
              endIcon && "pr-10",
              className
            )}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            ref={ref}
            {...props}
          />
          {(endIcon || isPassword) && (
            <div
              className={cn(
                "absolute inset-y-0 right-3 flex items-center text-foreground/50",
                isPassword && "cursor-pointer"
              )}
              onClick={
                isPassword ? () => setShowPassword(!showPassword) : undefined
              }
            >
              {isPassword ? (
                showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )
              ) : (
                endIcon
              )}
            </div>
          )}
        </div>
        {error && (
          <p
            id={errorId}
            className="text-sm font-medium text-primary"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
