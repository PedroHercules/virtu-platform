"use client";

import * as React from "react";
import { Edit, Trash, UserCheck, UserX } from "lucide-react";
import { ActionDropdown, ActionItem } from "@/components/ui/action-dropdown";
import { DataTableColumn } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { Student } from "../mock/students-data";

// Props para as ações das colunas
interface ColumnActionsProps {
  onUpdateStatus: (student: Student, status: "active" | "inactive") => void;
  onDelete: (student: Student) => void;
}

export const useStudentsColumns = ({
  onUpdateStatus,
  onDelete,
}: ColumnActionsProps): DataTableColumn<Student>[] => {
  const router = useRouter();

  return [
    {
      key: "name",
      title: "Nome",
      sortable: true,
      render: (value, student) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center border border-accent/20">
            <span className="text-sm font-semibold text-accent">
              {student.name.charAt(0)}
            </span>
          </div>
          <span className="font-semibold">{student.name}</span>
        </div>
      ),
    },
    {
      key: "email",
      title: "Email",
      sortable: true,
      render: (value) => (
        <span className="text-muted-foreground">{String(value)}</span>
      ),
    },
    {
      key: "document",
      title: "Documento",
      render: (value) => (
        <span className="text-muted-foreground">{String(value)}</span>
      ),
    },
    {
      key: "plan",
      title: "Plano",
      sortable: true,
      render: (value, student) => (
        <span className="font-semibold">{student.plan.name}</span>
      ),
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (value, student) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            student.status === "active"
              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
              : "bg-orange-500/10 text-orange-600 border border-orange-500/20"
          }`}
        >
          {student.status === "active" ? "Ativo" : "Inativo"}
        </span>
      ),
    },
    {
      key: "createdAt",
      title: "Data de Cadastro",
      sortable: true,
      render: (value) => (
        <span className="text-muted-foreground">
          {new Date(String(value)).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "actions" as keyof Student,
      title: "",
      width: 48,
      render: (_, student) => {
        const actions: ActionItem[] = [
          {
            label: "Editar",
            icon: <Edit size={16} />,
            onClick: () => router.push(`/students/${student.id}/edit`),
          },
          {
            label: "Ativar",
            icon: <UserCheck size={16} />,
            onClick: () => onUpdateStatus(student, "active"),
            disabled: student.status === "active",
            className: "text-emerald-600",
            separator: true,
          },
          {
            label: "Inativar",
            icon: <UserX size={16} />,
            onClick: () => onUpdateStatus(student, "inactive"),
            disabled: student.status === "inactive",
            className: "text-orange-600",
          },
          {
            label: "Excluir",
            icon: <Trash size={16} />,
            onClick: () => onDelete(student),
            className: "text-red-600 focus:text-red-600",
            separator: true,
          },
        ];

        return <ActionDropdown actions={actions} />;
      },
    },
  ];
};

// Re-exportar o tipo Student do mock para facilitar importações
export type { Student } from "../mock/students-data";
