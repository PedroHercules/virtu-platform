"use client";

import { Toaster as Sonner } from "sonner";

type ToastProps = React.ComponentProps<typeof Sonner>;

export const Toaster = (props: ToastProps) => {
  return (
    <Sonner
      toastOptions={{
        classNames: {
          toast: "bg-muted text-foreground border border-border",
          description: "text-sm text-muted-foreground",
          actionButton: "text-sm text-accent hover:text-accent-foreground",
          cancelButton: "text-sm text-primary hover:text-primary-foreground",
        },
      }}
      richColors
      theme="dark"
      className="toaster group"
      position="top-center"
      {...props}
    />
  );
};
