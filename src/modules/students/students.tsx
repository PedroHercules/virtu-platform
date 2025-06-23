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
import { FiltersFormData } from "@/modules/students/schemas/students-filters.schema";
import { getStudentsAction } from "./actions";
import { useDebounce } from "@/hooks/use-debounce";

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

const statusOptions = [
  { value: "all", label: "Todos os status" },
  { value: "active", label: "Ativo" },
  { value: "inactive", label: "Inativo" },
];

export const Students: React.FC<StudentsProps> = ({
  students: initialStudents,
  plans,
  currentFilters,
}) => {
  const router = useRouter();

  const [studentsData, setStudentsData] =
    React.useState<StudentPaginatedResponse>(initialStudents);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState(currentFilters.search);
  const [selectedStudents, setSelectedStudents] = React.useState<
    StudentEntity[]
  >([]);

  const filtersForm = useForm<FiltersFormData>({
    defaultValues: {
      searchTerm: currentFilters.search,
      status: currentFilters.status,
      planId: currentFilters.planId,
    },
  });

  const { control, watch } = filtersForm;
  const formValues = watch();

  const fetchStudents = React.useCallback(
    async (filters: {
      pageNumber?: number;
      pageSize?: number;
      searchTerm?: string;
      status?: "all" | "active" | "inactive";
      planId?: string;
    }) => {
      setIsLoading(true);
      try {
        const response = await getStudentsAction({
          pageNumber: filters.pageNumber || 1,
          pageSize: filters.pageSize || studentsData.itemsPerPage,
          searchTerm: filters.searchTerm || "",
          status: filters.status || "all",
          planId: filters.planId === "all" ? undefined : filters.planId,
        });

        if (response.success) {
          setStudentsData(response.data as StudentPaginatedResponse);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [studentsData.itemsPerPage]
  );

  const { isPending: searchPending, handleChange } = useDebounce(
    async (searchTerm: string) => {
      filtersForm.setValue("searchTerm", searchTerm);

      await fetchStudents({
        pageNumber: 1,
        pageSize: studentsData.itemsPerPage,
        searchTerm,
        status: formValues.status,
        planId: formValues.planId,
      });
    }
  );

  const planOptions = [
    { value: "all", label: "Todos os planos" },
    ...plans.map((plan) => ({ value: plan.id, label: plan.name })),
  ];

  const handleDeleteStudent = (student: StudentEntity) => {
    console.log("Deletar aluno:", student.id);
    setSelectedStudents((prev) => prev.filter((s) => s.id !== student.id));
  };

  const handleDeleteSelected = () => {
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
    console.log("Atualizar status do aluno:", student.id, "para", newStatus);
  };

  const handleUpdateStatusBatch = (newStatus: "active" | "inactive") => {
    console.log(
      "Atualizar status dos alunos:",
      selectedStudents.map((s) => s.id),
      "para",
      newStatus
    );
    setSelectedStudents([]);
  };

  const handleChangePage = async (page: number) => {
    await fetchStudents({
      pageNumber: page,
      pageSize: studentsData.itemsPerPage,
      searchTerm: formValues.searchTerm,
      status: formValues.status,
      planId: formValues.planId,
    });
  };

  const handleUpdatePageSize = async (pageSize: number) => {
    await fetchStudents({
      pageNumber: 1,
      pageSize,
      searchTerm: formValues.searchTerm,
      status: formValues.status,
      planId: formValues.planId,
    });
  };

  const updateFilters = async (newFilters: Partial<FiltersFormData>) => {
    await fetchStudents({
      pageNumber: 1,
      pageSize: studentsData.itemsPerPage,
      searchTerm: formValues.searchTerm,
      status: newFilters.status || formValues.status,
      planId: newFilters.planId || formValues.planId,
    });
  };

  const clearFilters = async () => {
    setSearchInput("");
    filtersForm.reset({
      searchTerm: "",
      status: "all",
      planId: "all",
    });

    await fetchStudents({
      pageNumber: 1,
      pageSize: studentsData.itemsPerPage,
      searchTerm: "",
      status: "all",
      planId: "all",
    });
  };

  const isFiltered =
    formValues.searchTerm ||
    formValues.status !== "all" ||
    formValues.planId !== "all";

  const totalLoading = isLoading || searchPending;

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
      <div className="space-y-4">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/60 z-10" />
              <Input
                value={searchInput}
                type="text"
                placeholder="Buscar por nome, email ou documento..."
                inputSize="md"
                className="pl-10 text-md"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  handleChange(e.target.value);
                }}
              />
            </div>
          </div>

          <Controller
            name="status"
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
                disabled={totalLoading}
              />
            )}
          />

          <Controller
            name="planId"
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
                disabled={totalLoading}
              />
            )}
          />
        </form>

        {/* Botão para limpar filtros */}
        {isFiltered && (
          <div className="flex justify-end">
            <button
              onClick={() => {
                clearFilters();
                filtersForm.reset({
                  searchTerm: "",
                  status: "all",
                  planId: "all",
                });
              }}
              disabled={totalLoading}
              className="text-sm text-foreground/60 hover:text-foreground underline transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>

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
        data={studentsData.data as unknown as Record<string, unknown>[]}
        columns={
          columns as unknown as DataTableColumn<Record<string, unknown>>[]
        }
        loading={totalLoading}
        onRowClick={(student) =>
          router.push(
            studentsRoutes.editStudent((student as unknown as StudentEntity).id)
          )
        }
        pagination={{
          enabled: true,
          type: "server",
          currentPage: studentsData.currentPage,
          pageSize: studentsData.itemsPerPage,
          totalItems: studentsData.totalItems,
          totalPages: studentsData.totalPages,
          pageSizeOptions: [5, 10, 20, 50],
          showTotal: true,
          showPageSizeSelector: true,
          onPageChange: handleChangePage,
          onPageSizeChange: handleUpdatePageSize,
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
