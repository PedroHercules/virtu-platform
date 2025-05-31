"use client";

import * as React from "react";
import { PlusCircle, Search, CheckCircle, XCircle, Trash } from "lucide-react";
import { plans, studentsData } from "./mock/students-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";
import { useStudentsColumns } from "./components/columns";
import { Student } from "./mock/students-data";
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
  const [selectedStudents, setSelectedStudents] = React.useState<Student[]>([]);

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
  const handleDeleteStudent = (student: Student) => {
    // TODO: Implementar deleção individual
    console.log("Deletar aluno:", student.id);
    setSelectedStudents((prev) => prev.filter((s) => s.id !== student.id));
  };

  const handleDeleteSelected = () => {
    // TODO: Implementar deleção em lote
    console.log(
      "Deletar alunos:",
      selectedStudents.map((s) => s.id)
    );
    setSelectedStudents([]);
  };

  const handleUpdateStudentStatus = (
    student: Student,
    newStatus: "active" | "inactive"
  ) => {
    // TODO: Implementar atualização de status individual
    console.log("Atualizar status do aluno:", student.id, "para", newStatus);
  };

  const handleUpdateStatusBatch = (newStatus: "active" | "inactive") => {
    // TODO: Implementar atualização de status em lote
    console.log(
      "Atualizar status dos alunos:",
      selectedStudents.map((s) => s.id),
      "para",
      newStatus
    );
    setSelectedStudents([]);
  };

  // Configuração das colunas usando o hook
  const columns = useStudentsColumns({
    onUpdateStatus: handleUpdateStudentStatus,
    onDelete: handleDeleteStudent,
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-foreground bg-clip-text text-transparent">
          Alunos
        </h1>
        <button className="inline-flex items-center gap-2 rounded-xl bg-accent border border-border px-6 py-3 text-sm font-semibold text-background hover:bg-accent-hover shadow-lg transition-all duration-200 hover:shadow-xl backdrop-blur-sm">
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
              className="h-12 w-full rounded-xl border border-border/30 bg-background/80 backdrop-blur-sm pl-10 pr-4 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
            />
          </div>
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value: "all" | "active" | "inactive") =>
            setStatusFilter(value)
          }
        >
          <SelectTrigger className="h-12 rounded-xl border-border/30 bg-background/80 backdrop-blur-sm shadow-sm">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
          </SelectContent>
        </Select>
        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger className="h-12 rounded-xl border-border/30 bg-background/80 backdrop-blur-sm shadow-sm">
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
        <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 p-4 backdrop-blur-sm shadow-sm">
          <span className="text-sm font-semibold text-accent">
            {selectedStudents.length} aluno(s) selecionado(s)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleUpdateStatusBatch("active")}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary border border-border hover:bg-primary-hover text-foreground hover:text-accent transition-all duration-200 shadow-sm hover:shadow-md"
              title="Ativar selecionados"
            >
              <CheckCircle size={16} />
            </button>
            <button
              onClick={() => handleUpdateStatusBatch("inactive")}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary border border-border hover:bg-secondary-hover text-foreground hover:text-accent transition-all duration-200 shadow-sm hover:shadow-md"
              title="Inativar selecionados"
            >
              <XCircle size={16} />
            </button>
            <button
              onClick={handleDeleteSelected}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted border border-border hover:bg-accent/20 text-foreground hover:text-accent transition-all duration-200 shadow-sm hover:shadow-md"
              title="Excluir selecionados"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Tabela de Alunos */}
      <DataTable
        data={filteredStudents}
        columns={columns}
        onRowClick={(student) =>
          router.push(homeRoutes.studentsDetails(student.id))
        }
        pagination={{
          enabled: true,
          type: "local",
          pageSize: 10,
          pageSizeOptions: [5, 10, 20, 50],
          showTotal: true,
          showPageSizeSelector: true,
        }}
        selection={{
          enabled: true,
          selectedItems: selectedStudents,
          onSelectionChange: setSelectedStudents,
          getItemId: (student) => student.id,
        }}
        emptyMessage="Nenhum aluno encontrado"
      />
    </div>
  );
};
