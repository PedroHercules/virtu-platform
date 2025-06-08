"use client";

import * as React from "react";
import { XCircle, RefreshCw, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ErrorModalProps {
  open: boolean;
  title?: string;
  message?: string;
  details?: string;
  onClose: () => void;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorModal({
  open,
  title = "Erro na operação",
  message = "Ocorreu um erro inesperado. Tente novamente.",
  details,
  onClose,
  onRetry,
  showRetry = true,
}: ErrorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center border border-destructive/20">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <DialogTitle className="text-xl text-destructive">
            {title}
          </DialogTitle>
          <DialogDescription className="mt-3 text-base">
            {message}
          </DialogDescription>
        </DialogHeader>

        {details && (
          <div className="bg-muted rounded-lg p-4 border border-border mt-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">
                  Detalhes técnicos:
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {details}
                </p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex-col gap-3 sm:flex-col mt-6">
          <div className="flex gap-3 w-full">
            {showRetry && onRetry && (
              <Button onClick={onRetry} variant="outline" className="flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar novamente
              </Button>
            )}
            <Button onClick={onClose} variant="secondary" className="flex-1">
              Fechar
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Se o problema persistir, entre em contato com o suporte
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
