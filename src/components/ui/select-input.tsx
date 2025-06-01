"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectInputProps {
  /**
   * Valor atual selecionado
   */
  value?: string;
  /**
   * Callback chamado quando o valor muda
   */
  onValueChange?: (value: string) => void;
  /**
   * Lista de opções do select
   */
  options: SelectOption[];
  /**
   * Texto do placeholder quando nenhum valor está selecionado
   */
  placeholder?: string;
  /**
   * Se o select está desabilitado
   */
  disabled?: boolean;
  /**
   * Classes CSS adicionais para o trigger
   */
  className?: string;
  /**
   * Classes CSS adicionais para o content
   */
  contentClassName?: string;
  /**
   * Altura do trigger (default: h-12)
   */
  size?: "sm" | "md" | "lg";
  /**
   * Variante visual do select
   */
  variant?: "default" | "ghost" | "outline";
}

const sizeClasses = {
  sm: "h-9 text-sm",
  md: "h-10 text-sm",
  lg: "h-12 text-sm",
};

const variantClasses = {
  default: "border-border/30 bg-input backdrop-blur-sm shadow-sm",
  ghost: "border-transparent bg-transparent hover:bg-background/50",
  outline: "border-border bg-transparent",
};

export const SelectInput = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  SelectInputProps
>(
  (
    {
      value,
      onValueChange,
      options,
      placeholder = "Selecione uma opção",
      disabled = false,
      className,
      contentClassName,
      size = "lg",
      variant = "default",
      ...props
    },
    ref
  ) => {
    return (
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          ref={ref}
          className={cn(
            "rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50",
            sizeClasses[size],
            variantClasses[variant],
            disabled ? "bg-input/40 opacity-70 cursor-not-allowed" : "",
            className
          )}
          {...props}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={cn("min-w-[200px]", contentClassName)}>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

SelectInput.displayName = "SelectInput";

export default SelectInput;
