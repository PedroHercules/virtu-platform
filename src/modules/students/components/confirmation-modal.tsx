"use client";

import * as React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Trash,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type ConfirmationAction = "activate" | "deactivate" | "delete";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: ConfirmationAction;
  title?: string;
  description?: string;
  itemName?: string;
  loading?: boolean;
  count?: number;
}

export function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  action,
  title,
  description,
  itemName = "aluno",
  loading = false,
  count = 1,
}: ConfirmationModalProps) {
  // Configurações baseadas na ação
  const getActionConfig = () => {
    const itemNameDisplay = itemName === "aluno" ? "aluno" : itemName;
    const itemsNameDisplay = itemName === "aluno" ? "alunos" : `${itemName}s`;
    const displayName = count === 1 ? itemNameDisplay : itemsNameDisplay;

    switch (action) {
      case "activate":
        return {
          icon: <CheckCircle2 className="h-8 w-8 text-success" />,
          iconBg: "bg-success/10 border-success/20",
          title: title || `Ativar ${displayName}`,
          description:
            description ||
            `Tem certeza que deseja ativar ${count === 1 ? "este" : "estes"} ${count} ${displayName}?`,
          confirmText: "Ativar",
          confirmVariant: "default" as const,
          confirmIcon: <CheckCircle2 />,
        };
      case "deactivate":
        return {
          icon: <XCircle className="h-8 w-8 text-warning" />,
          iconBg: "bg-warning/10 border-warning/20",
          title: title || `Inativar ${displayName}`,
          description:
            description ||
            `Tem certeza que deseja inativar ${count === 1 ? "este" : "estes"} ${count} ${displayName}?`,
          confirmText: "Inativar",
          confirmVariant: "warning" as const,
          confirmIcon: <XCircle />,
        };
      case "delete":
        return {
          icon: <Trash className="h-8 w-8 text-destructive" />,
          iconBg: "bg-destructive/10 border-destructive/20",
          title: title || `Excluir ${displayName}`,
          description:
            description ||
            `Tem certeza que deseja excluir ${count === 1 ? "este" : "estes"} ${count} ${displayName}? Esta ação não pode ser desfeita.`,
          confirmText: "Excluir",
          confirmVariant: "destructive" as const,
          confirmIcon: <Trash />,
        };
      default:
        return {
          icon: <AlertTriangle className="h-8 w-8 text-warning" />,
          iconBg: "bg-warning/10 border-warning/20",
          title: title || "Confirmar ação",
          description: description || "Tem certeza que deseja continuar?",
          confirmText: "Confirmar",
          confirmVariant: "default" as const,
          confirmIcon: null,
        };
    }
  };

  const config = getActionConfig();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div
              className={`h-16 w-16 rounded-full ${config.iconBg} flex items-center justify-center border`}
            >
              {config.icon}
            </div>
          </div>
          <DialogTitle className="text-xl">{config.title}</DialogTitle>
          <DialogDescription className="mt-2">
            {config.description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col gap-3 sm:flex-col mt-6">
          <div className="flex gap-3 w-full">
            <Button
              onClick={onClose}
              className="flex-1"
              variant="outline"
              disabled={loading}
            >
              Cancelar
            </Button>

            <Button
              onClick={onConfirm}
              className="flex-1"
              variant={config.confirmVariant}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {config.confirmText}
                </>
              ) : (
                <>
                  {config.confirmIcon && (
                    <span className="mr-2">{config.confirmIcon}</span>
                  )}
                  {config.confirmText}
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
