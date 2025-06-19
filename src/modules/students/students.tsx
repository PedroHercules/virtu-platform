"use client";

import * as React from "react";
import { PlusCircle, Search, CheckCircle, XCircle, Trash } from "lucide-react";
import SelectInput from "@/components/ui/select-input";
import { Input } from "@/components/ui/input";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { useStudentsColumns } from "./components/columns";
import { studentsRoutes } from "@/routes/students";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import {
  StudentEntity,
  StudentPaginatedResponse,
} from "@/services/students/students";
import { PlanEntity } from "@/services/plans/plan";
import { useServerFilters } from "@/hooks/use-server-filters";

type FiltersFormData = {
  searchTerm: string;
  statusFilter: "all" | "active" | "inactive";
  planFilter: string;
};

interface StudentsProps {
  students: StudentPaginatedResponse;
  plans: PlanEntity[];
  currentFilters: {
    page: number;
    limit: number;
    search: string;
    status: "all" | "active" | "inactive";
    planId: string;
  };
}

export const Students: React.FC<StudentsProps> = ({
  students,
  plans,
  currentFilters,
}) => {
  const router = useRouter();

  // Hook reutilizável para filtros do servidor
  const { updateFilters, debouncedSearch, updatePage, updatePageSize } =
    useServerFilters<typeof currentFilters>({
      basePath: "/students",
    });

  const filtersForm = useForm<FiltersFormData>({
    defaultValues: {
      searchTerm: currentFilters.search,
      statusFilter: currentFilters.status,
      planFilter: currentFilters.planId,
    },
  });

  const { register, control } = filtersForm;

  // Estado para seleção em lote
  const [selectedStudents, setSelectedStudents] = React.useState<
    StudentEntity[]
  >([]);

  // Opções para os selects
  const statusOptions = [
    { value: "all", label: "Todos os status" },
    { value: "active", label: "Ativo" },
    { value: "inactive", label: "Inativo" },
  ];

  const planOptions = [
    { value: "all", label: "Todos os planos" },
    ...plans.map((plan) => ({ value: plan.id, label: plan.name })),
  ];

  // Handlers
  const handleDeleteStudent = (student: StudentEntity) => {
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
    student: StudentEntity,
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
    <div className="p-6 space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-accent">Alunos</h1>
          <p className="text-foreground/60 font-medium">
            Gerencie os alunos da academia
          </p>
        </div>
        <button
          onClick={() => router.push(studentsRoutes.studentsCreate)}
          className="inline-flex items-center gap-2 rounded-xl bg-accent border border-border px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-hover shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <PlusCircle size={18} />
          Novo Aluno
        </button>
      </div>

      {/* Filtros usando React Hook Form */}
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/60 z-10" />
            <Input
              {...register("searchTerm")}
              type="text"
              placeholder="Buscar por nome, email ou documento..."
              inputSize="md"
              className="pl-10 text-md"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
        </div>

        <Controller
          name="statusFilter"
          control={control}
          render={({ field }) => (
            <SelectInput
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                updateFilters({
                  status: value as "all" | "active" | "inactive",
                });
              }}
              options={statusOptions}
              placeholder="Filtrar por status"
            />
          )}
        />

        <Controller
          name="planFilter"
          control={control}
          render={({ field }) => (
            <SelectInput
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                updateFilters({ planId: value });
              }}
              options={planOptions}
              placeholder="Filtrar por plano"
            />
          )}
        />
      </form>

      {/* Ações em Lote */}
      {selectedStudents.length > 0 && (
        <div className="flex items-center gap-4 rounded-xl bg-secondary border border-border p-4 shadow-sm">
          <span className="text-sm font-semibold text-accent">
            {selectedStudents.length} aluno(s) selecionado(s)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleUpdateStatusBatch("active")}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-success border border-border hover:bg-success-hover text-success-foreground transition-all duration-200 shadow-sm hover:shadow-md"
              title="Ativar selecionados"
            >
              <CheckCircle size={16} />
            </button>
            <button
              onClick={() => handleUpdateStatusBatch("inactive")}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-warning border border-border hover:bg-warning-hover text-warning-foreground transition-all duration-200 shadow-sm hover:shadow-md"
              title="Inativar selecionados"
            >
              <XCircle size={16} />
            </button>
            <button
              onClick={handleDeleteSelected}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-destructive border border-border hover:bg-destructive-hover text-destructive-foreground transition-all duration-200 shadow-sm hover:shadow-md"
              title="Excluir selecionados"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Tabela de Alunos */}
      <DataTable
        data={students.data as unknown as Record<string, unknown>[]}
        columns={
          columns as unknown as DataTableColumn<Record<string, unknown>>[]
        }
        onRowClick={(student) =>
          router.push(
            studentsRoutes.editStudent((student as unknown as StudentEntity).id)
          )
        }
        pagination={{
          enabled: true,
          type: "server",
          currentPage: currentFilters.page,
          pageSize: currentFilters.limit,
          totalItems: students.totalItems,
          totalPages: students.totalPages,
          pageSizeOptions: [5, 10, 20, 50],
          showTotal: true,
          showPageSizeSelector: true,
          onPageChange: updatePage,
          onPageSizeChange: updatePageSize,
        }}
        selection={{
          enabled: true,
          selectedItems: selectedStudents as unknown as Record<
            string,
            unknown
          >[],
          onSelectionChange: (items) =>
            setSelectedStudents(items as unknown as StudentEntity[]),
          getItemId: (student) => (student as unknown as StudentEntity).id,
        }}
        emptyMessage="Nenhum aluno encontrado"
      />
    </div>
  );
};
