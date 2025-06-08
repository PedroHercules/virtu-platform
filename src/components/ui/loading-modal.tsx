"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LoadingModalProps {
  open: boolean;
  title?: string;
  description?: string;
}

export function LoadingModal({
  open,
  title = "Processando...",
  description = "Por favor, aguarde enquanto processamos sua solicitação.",
}: LoadingModalProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          </div>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="mt-2">{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
