"use client";

import * as React from "react";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ActionItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  separator?: boolean; // Adiciona separador após este item
}

interface ActionDropdownProps {
  actions: ActionItem[];
  triggerClassName?: string;
  contentClassName?: string;
}

export function ActionDropdown({
  actions,
  triggerClassName = "rounded-lg p-2 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-accent/10",
  contentClassName = "w-48",
}: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          onClick={(e) => e.stopPropagation()}
          className={triggerClassName}
        >
          <MoreVertical size={16} className="text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`${contentClassName} bg-card/95 backdrop-blur-sm border-border/50 shadow-lg`}
        align="end"
        sideOffset={4}
      >
        {actions.map((action, index) => (
          <React.Fragment key={index}>
            <DropdownMenuItem
              className={`gap-2 ${action.className || ""}`}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              disabled={action.disabled}
            >
              {action.icon}
              <span>{action.label}</span>
            </DropdownMenuItem>
            {action.separator && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
