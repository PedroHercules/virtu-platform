"use client";

import * as React from "react";
import { Edit, Eye, MoreVertical, Trash, UserCheck, UserX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumn } from "@/components/ui/data-table";
import { homeRoutes } from "@/routes/home";
import { useRouter } from "next/navigation";

// Tipo do estudante
export interface Student {
  id: string;
  name: string;
  email: string;
  document: string;
  plan: {
    id: string;
    name: string;
  };
  status: "active" | "inactive";
  createdAt: string;
}

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
      render: (value) => <span className="text-muted-foreground">{value}</span>,
    },
    {
      key: "document",
      title: "Documento",
      render: (value) => <span className="text-muted-foreground">{value}</span>,
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
          {new Date(value).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "actions",
      title: "",
      width: 48,
      render: (_, student) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg p-2 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-accent/10"
            >
              <MoreVertical size={16} className="text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem
              className="gap-2"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                router.push(homeRoutes.studentsDetails(student.id));
              }}
            >
              <Eye size={16} />
              <span>Ver detalhes</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Edit size={16} />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 text-emerald-600"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateStatus(student, "active");
              }}
              disabled={student.status === "active"}
            >
              <UserCheck size={16} />
              <span>Ativar</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 text-orange-600"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateStatus(student, "inactive");
              }}
              disabled={student.status === "inactive"}
            >
              <UserX size={16} />
              <span>Inativar</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 text-red-600 focus:text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(student);
              }}
            >
              <Trash size={16} />
              <span>Excluir</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
};
