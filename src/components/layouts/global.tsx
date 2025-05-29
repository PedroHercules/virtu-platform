import { Sidebar } from "@/components/ui/sidebar";
import * as React from "react";

export const GlobalLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
};
