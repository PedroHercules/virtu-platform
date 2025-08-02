"use client";

import * as React from "react";
import { PlusCircle, Search, CheckCircle, XCircle, Trash } from "lucide-react";
import {
  ConfirmationModal,
  ConfirmationAction,
} from "./components/confirmation-modal";
import SelectInput from "@/components/ui/select-input";
import { Input } from "@/components/ui/input";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { useStudentsColumns } from "./components/columns";
import { studentsRoutes } from "@/routes/students";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import {
  StudentEntity,
  StudentPaginatedResponse,
} from "@/services/students/students";
import { PlanEntity } from "@/services/plans/plan";
import { FiltersFormData } from "@/modules/students/schemas/students-filters.schema";
import {
  deleteStudentsInBatchAction,
  getStudentsAction,
  updateStudentStatusBatchAction,
} from "./actions";
import { useServerFilters } from "@/hooks/use-server-filters";
import { toast } from "sonner";

interface StudentsProps {
  students: StudentPaginatedResponse;
  plans: PlanEntity[];
}

const statusOptions = [
  { value: "all", label: "Todos os status" },
  { value: "active", label: "Ativo" },
  { value: "inactive", label: "Inativo" },
];

export const Students: React.FC<StudentsProps> = ({
  students: initialStudents,
  plans,
}) => {
  const router = useRouter();
  const [selectedStudents, setSelectedStudents] = React.useState<
    StudentEntity[]
  >([]);

  const filtersForm = useForm<FiltersFormData>({
    defaultValues: {
      searchTerm: "",
      status: "all",
      planId: "",
    },
  });

  const {
    data: studentsData,
    isLoading,
    searchInput,
    isFiltered,
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
    updateFilters,
    clearFilters,
    refreshData,
  } = useServerFilters<StudentEntity, FiltersFormData>({
    initialData: initialStudents,
    initialFilters: {
      page: initialStudents.currentPage,
      limit: initialStudents.itemsPerPage,
      search: "",
    },
    filtersForm,
    fetchAction: async (filters) => {
      const response = await getStudentsAction({
        pageNumber: filters.pageNumber as number,
        pageSize: filters.pageSize as number,
        searchTerm: filters.searchTerm as string,
        status: filters.status as "all" | "active" | "inactive",
        planId:
          filters.planId === "all" ? undefined : (filters.planId as string),
      });
      return response;
    },
  });

  const { control } = filtersForm;

  const planOptions = [
    { value: "all", label: "Todos os planos" },
    ...plans.map((plan) => ({ value: plan.id, label: plan.name })),
  ];

  // Estados para controle dos modais de confirmação
  const [confirmationModal, setConfirmationModal] = React.useState<{
    open: boolean;
    action: ConfirmationAction;
    students: StudentEntity[];
    title?: string;
    description?: string;
  }>({ open: false, action: "delete", students: [] });

  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleDeleteStudent = (student: StudentEntity) => {
    setConfirmationModal({
      open: true,
      action: "delete",
      students: [student],
      title: `Excluir ${student.name}`,
      description: `Tem certeza que deseja excluir o aluno ${student.name}? Esta ação não pode ser desfeita.`,
    });
  };

  const handleDeleteSelected = () => {
    const count = selectedStudents.length;
    const studentText = count === 1 ? "aluno" : "alunos";

    setConfirmationModal({
      open: true,
      action: "delete",
      students: selectedStudents,
      title: `Excluir ${count} ${studentText}`,
      description: `Tem certeza que deseja excluir ${count} ${studentText}? Esta ação não pode ser desfeita.`,
    });
  };

  const handleConfirmDelete = async () => {
    const students = confirmationModal.students;
    setIsProcessing(true);

    try {
      const response = await deleteStudentsInBatchAction(
        students.map((s) => s.id)
      );
      setIsProcessing(false);
      setConfirmationModal((prev) => ({ ...prev, open: false }));

      if (response.success) {
        toast.success(response.message);
        refreshData();
        setSelectedStudents([]);
      } else {
        toast.error(response.message);
      }
    } catch (error: unknown) {
      console.error("Erro ao excluir alunos:", error);
      setIsProcessing(false);
      setConfirmationModal((prev) => ({ ...prev, open: false }));
      toast.error("Erro ao excluir alunos. Tente novamente.");
    }
  };

  const handleUpdateStudentStatus = (
    student: StudentEntity,
    newStatus: "active" | "inactive"
  ) => {
    const isActivating = newStatus === "active";
    const action = isActivating ? "activate" : "deactivate";
    const actionText = isActivating ? "Ativar" : "Inativar";

    setConfirmationModal({
      open: true,
      action: action as ConfirmationAction,
      students: [student],
      title: `${actionText} ${student.name}`,
      description: `Tem certeza que deseja ${isActivating ? "ativar" : "inativar"} o aluno ${student.name}?`,
    });
  };

  const handleConfirmStatusUpdate = async () => {
    const students = confirmationModal.students;
    const action = confirmationModal.action;
    const newStatus = action === "activate" ? "active" : "inactive";
    const isActivating = newStatus === "active";

    setIsProcessing(true);

    try {
      await updateStudentStatusBatchAction({
        studentsIds: students.map((s) => s.id),
        status: newStatus,
      });

      setIsProcessing(false);
      setConfirmationModal((prev) => ({ ...prev, open: false }));

      const actionText = isActivating ? "ativado" : "desativado";
      const count = students.length;
      const studentText = count === 1 ? "aluno" : "alunos";

      toast.success(
        count === 1
          ? `${students[0].name} ${actionText} com sucesso!`
          : `${count} ${studentText} ${count === 1 ? actionText : actionText + "s"} com sucesso!`
      );

      refreshData();
      if (count > 1) {
        setSelectedStudents([]);
      }
    } catch (error: unknown) {
      console.error("Erro ao atualizar status dos alunos:", error);
      setIsProcessing(false);
      setConfirmationModal((prev) => ({ ...prev, open: false }));

      const count = students.length;
      const studentText = count === 1 ? "aluno" : "alunos";

      toast.error(
        `Erro ao ${isActivating ? "ativar" : "inativar"} ${studentText}. Tente novamente.`
      );
    }
  };

  const handleUpdateStatusBatch = (newStatus: "active" | "inactive") => {
    const count = selectedStudents.length;
    const isActivating = newStatus === "active";
    const action = isActivating ? "activate" : "deactivate";
    const actionText = isActivating ? "Ativar" : "Inativar";
    const studentText = count === 1 ? "aluno" : "alunos";

    setConfirmationModal({
      open: true,
      action: action as ConfirmationAction,
      students: selectedStudents,
      title: `${actionText} ${count} ${studentText}`,
      description: `Tem certeza que deseja ${isActivating ? "ativar" : "inativar"} ${count} ${studentText}?`,
    });
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
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <SelectInput
                value={field.value as string}
                onValueChange={(value) => {
                  field.onChange(value);
                  updateFilters({
                    status: value,
                  });
                }}
                options={statusOptions}
                placeholder="Filtrar por status"
                disabled={isLoading}
              />
            )}
          />

          <Controller
            name="planId"
            control={control}
            render={({ field }) => (
              <SelectInput
                value={field.value as string}
                onValueChange={(value) => {
                  field.onChange(value);
                  updateFilters({ planId: value });
                }}
                options={planOptions}
                placeholder="Filtrar por plano"
                disabled={isLoading}
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
              disabled={isLoading}
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
        loading={isLoading}
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
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
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

      {/* Modal de Confirmação */}
      <ConfirmationModal
        open={confirmationModal.open}
        onClose={() =>
          setConfirmationModal((prev) => ({ ...prev, open: false }))
        }
        onConfirm={() => {
          if (confirmationModal.action === "delete") {
            handleConfirmDelete();
          } else {
            handleConfirmStatusUpdate();
          }
        }}
        action={confirmationModal.action}
        title={confirmationModal.title}
        description={confirmationModal.description}
        itemName="aluno"
        loading={isProcessing}
        count={confirmationModal.students.length}
      />
    </div>
  );
};
