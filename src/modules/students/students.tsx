"use client";

import * as React from "react";
import {
  Edit,
  Eye,
  MoreVertical,
  PlusCircle,
  Search,
  Trash,
  UserCheck,
  UserX,
} from "lucide-react";
import { plans, studentsData } from "./mock/students-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { homeRoutes } from "@/routes/home";
import { useRouter } from "next/navigation";

export const Students = () => {
  const router = useRouter();

  // Estado para filtros
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<
    "all" | "active" | "inactive"
  >("all");
  const [planFilter, setPlanFilter] = React.useState("all");

  // Estado para seleção em lote
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([]);

  // Filtrar alunos
  const filteredStudents = React.useMemo(() => {
    return studentsData.filter((student) => {
      const matchesSearch =
        searchTerm === "" ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.document.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || student.status === statusFilter;

      const matchesPlan =
        planFilter === "all" || student.plan.id === planFilter;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [searchTerm, statusFilter, planFilter]);

  // Handlers
  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map((s) => s.id));
    }
  };

  const handleSelectStudent = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleDeleteSelected = () => {
    // TODO: Implementar deleção em lote
    console.log("Deletar alunos:", selectedStudents);
    setSelectedStudents([]);
  };

  const handleUpdateStatusBatch = (newStatus: "active" | "inactive") => {
    // TODO: Implementar atualização de status em lote
    console.log(
      "Atualizar status dos alunos:",
      selectedStudents,
      "para",
      newStatus
    );
    setSelectedStudents([]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Alunos</h1>
        <button className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90">
          <PlusCircle size={18} />
          Novo Aluno
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value: "all" | "active" | "inactive") =>
            setStatusFilter(value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
          </SelectContent>
        </Select>
        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por plano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os planos</SelectItem>
            {plans.map((plan) => (
              <SelectItem key={plan.id} value={plan.id}>
                {plan.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Ações em Lote */}
      {selectedStudents.length > 0 && (
        <div className="flex items-center gap-4 rounded-lg bg-muted p-4">
          <span className="text-sm font-medium">
            {selectedStudents.length} aluno(s) selecionado(s)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleUpdateStatusBatch("active")}
              className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              Ativar
            </button>
            <button
              onClick={() => handleUpdateStatusBatch("inactive")}
              className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Inativar
            </button>
            <button
              onClick={handleDeleteSelected}
              className="rounded-lg bg-destructive px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-destructive/90"
            >
              Excluir
            </button>
          </div>
        </div>
      )}

      {/* Tabela de Alunos */}
      <div className="rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="w-12 p-4 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-border"
                      checked={
                        selectedStudents.length === filteredStudents.length &&
                        filteredStudents.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th className="p-4 text-left text-sm font-medium">Nome</th>
                <th className="p-4 text-left text-sm font-medium">Email</th>
                <th className="p-4 text-left text-sm font-medium">Documento</th>
                <th className="p-4 text-left text-sm font-medium">Plano</th>
                <th className="p-4 text-left text-sm font-medium">Status</th>
                <th className="p-4 text-left text-sm font-medium">
                  Data de Cadastro
                </th>
                <th className="w-12 p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="group hover:bg-muted/50 cursor-pointer"
                  onClick={() =>
                    router.push(homeRoutes.studentsDetails(student.id))
                  }
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-border"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-accent bg-opacity-20 flex items-center justify-center">
                        <span className="text-sm font-medium text-accent">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {student.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{student.email}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{student.document}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium">
                      {student.plan.name}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.status === "active"
                          ? "bg-accent bg-opacity-20 text-accent"
                          : "bg-primary bg-opacity-20 text-primary"
                      }`}
                    >
                      {student.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">
                      {new Date(student.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg p-2 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-accent/10"
                        >
                          <MoreVertical
                            size={16}
                            className="text-muted-foreground"
                          />
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
                          className="gap-2 text-accent"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateStatusBatch("active");
                          }}
                          disabled={student.status === "active"}
                        >
                          <UserCheck size={16} />
                          <span>Ativar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateStatusBatch("inactive");
                          }}
                          disabled={student.status === "inactive"}
                        >
                          <UserX size={16} />
                          <span>Inativar</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="gap-2 text-destructive focus:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSelected();
                          }}
                        >
                          <Trash size={16} />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
