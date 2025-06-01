"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  CreditCard,
  Save,
  Award,
  Edit3,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SelectInput from "@/components/ui/select-input";
import { plans, studentsData } from "./mock/students-data";
import { graduationsData } from "./mock/graduations-data";
import { useRouter } from "next/navigation";
import { studentsRoutes } from "@/routes/students";
import { LoadingModal } from "@/components/ui/loading-modal";
import { ErrorModal } from "@/components/ui/error-modal";
import { StudentsSuccessModal } from "./components/success-modal";

// Schema de validação
const editStudentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Digite um email válido"),
  phone: z.string().optional(),
  document: z.string().min(1, "Documento é obrigatório"),
  planId: z.string().optional(),
  graduationId: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

type EditStudentFormData = z.infer<typeof editStudentSchema>;

interface EditStudentProps {
  studentId: string;
}

export const EditStudent: React.FC<EditStudentProps> = ({ studentId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState<{
    open: boolean;
    message: string;
    details?: string;
  }>({ open: false, message: "", details: undefined });

  // Buscar dados do estudante
  const student = React.useMemo(
    () => studentsData.find((s) => s.id === studentId),
    [studentId]
  );

  const form = useForm<EditStudentFormData>({
    resolver: zodResolver(editStudentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      document: "",
      planId: undefined,
      graduationId: undefined,
      status: "active",
    },
  });

  // Carregar dados do estudante no formulário
  React.useEffect(() => {
    if (student) {
      form.reset({
        name: student.name,
        email: student.email,
        phone: "", // Não temos phone nos dados mock
        document: student.document,
        planId: student.plan.id,
        graduationId: undefined, // Não temos graduationId nos dados mock
        status: student.status,
      });
    }
  }, [student, form]);

  // Opções de planos com informações detalhadas
  const planOptions = plans.map((plan) => ({
    value: plan.id,
    label: `${plan.name} - R$ ${plan.monthlyFee.toFixed(2)}/mês`,
  }));

  // Opções de graduações ordenadas por nível
  const graduationOptions = graduationsData
    .sort((a, b) => a.level - b.level)
    .map((graduation) => ({
      value: graduation.id,
      label: `${graduation.name} (Nível ${graduation.level})`,
    }));

  // Opções de status
  const statusOptions = [
    { value: "active", label: "Ativo" },
    { value: "inactive", label: "Inativo" },
  ];

  // Função para formatar telefone durante a digitação
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  };

  // Função para formatar documento
  const formatDocument = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2");
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Função para gerar data de vencimento
  const getExpirationDate = (createdAt: string) => {
    const date = new Date(createdAt);
    date.setMonth(date.getMonth() + 1); // Adiciona 1 mês
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Calcular tempo desde o cadastro
  const getTimeSinceRegistration = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} dias`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? "mês" : "meses"}`;
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      if (remainingMonths === 0) {
        return `${years} ${years === 1 ? "ano" : "anos"}`;
      }
      return `${years} ${years === 1 ? "ano" : "anos"} e ${remainingMonths} ${remainingMonths === 1 ? "mês" : "meses"}`;
    }
  };

  const onSubmit = async (data: EditStudentFormData) => {
    setIsSubmitting(true);

    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simular erro aleatório para demonstração
      if (Math.random() > 0.8) {
        throw new Error("Erro ao salvar alterações");
      }

      console.log("Dados atualizados do aluno:", data);

      // Sair do modo de edição e mostrar modal de sucesso
      setIsEditing(false);
      setShowSuccessModal(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao atualizar aluno";
      setErrorModal({
        open: true,
        message: errorMessage,
        details:
          "Verifique os dados inseridos e tente novamente. Se o problema persistir, entre em contato com o suporte técnico.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetrySubmit = () => {
    setErrorModal({ open: false, message: "", details: undefined });
    form.handleSubmit(onSubmit)();
  };

  const handleCloseErrorModal = () => {
    setErrorModal({ open: false, message: "", details: undefined });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleBack = () => {
    router.push(studentsRoutes.students);
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      // Se estava editando, restaurar valores originais
      if (student) {
        form.reset({
          name: student.name,
          email: student.email,
          phone: "",
          document: student.document,
          planId: student.plan.id,
          graduationId: undefined,
          status: student.status,
        });
      }
    }
    setIsEditing(!isEditing);
  };

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-6">
        <div className="container mx-auto h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Aluno não encontrado
            </h1>
            <p className="text-foreground/60 mb-6">
              O aluno que você está procurando não existe ou foi removido.
            </p>
            <button
              onClick={handleBack}
              className="h-12 px-6 rounded-xl bg-accent text-background font-semibold hover:bg-accent/90 transition-all duration-200"
            >
              Voltar para Lista
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-6">
      <div className="container mx-auto h-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/80 to-secondary/60 border border-border/30 hover:from-secondary hover:to-secondary/80 transition-all duration-200 hover:shadow-lg group"
          >
            <ArrowLeft
              size={20}
              className="text-foreground/80 group-hover:text-accent transition-colors"
            />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black bg-gradient-to-r from-accent via-accent/90 to-accent/70 bg-clip-text text-transparent">
                {isEditing ? "Editar Aluno" : "Visualizar Aluno"}
              </h1>
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  student.status === "active"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
              >
                {student.status === "active" ? "Ativo" : "Inativo"}
              </div>
            </div>
            <p className="text-foreground/60 font-medium">
              {isEditing
                ? "Modifique as informações do aluno"
                : "Visualize as informações do aluno"}
            </p>
          </div>
          <button
            onClick={handleToggleEdit}
            className={`flex items-center gap-2 h-12 px-6 rounded-xl font-semibold transition-all duration-200 ${
              isEditing
                ? "bg-secondary border border-border hover:bg-secondary/80 text-foreground"
                : "bg-accent text-background hover:bg-accent/90 shadow-lg shadow-accent/20"
            }`}
            disabled={isSubmitting}
          >
            {isEditing ? (
              <>
                <XCircle size={18} />
                Cancelar
              </>
            ) : (
              <>
                <Edit3 size={18} />
                Editar
              </>
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-start">
          {/* Informações do Aluno - Coluna principal */}
          <div className="lg:col-span-2 h-full">
            <div className="bg-gradient-to-br from-primary/50 via-background/95 to-secondary/30 backdrop-blur-sm border border-border/30 rounded-2xl shadow-xl shadow-accent/5 p-8 h-full flex flex-col">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 flex-1 flex flex-col justify-between"
                >
                  {/* Primeira linha: Nome e Email */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Nome */}
                    <div>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold flex items-center gap-2 text-base">
                              <User size={18} className="text-accent" />
                              Nome Completo *
                            </FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                disabled={!isEditing}
                                placeholder="Digite o nome completo do aluno"
                                className={`h-14 w-full rounded-xl border border-border/30 backdrop-blur-sm px-4 text-base shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 placeholder:text-muted-foreground ${
                                  isEditing
                                    ? "bg-background/80"
                                    : "bg-background/40 text-foreground/80"
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold flex items-center gap-2 text-base">
                              <Mail size={18} className="text-accent" />
                              Email *
                            </FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                type="email"
                                disabled={!isEditing}
                                placeholder="Digite o email do aluno"
                                className={`h-14 w-full rounded-xl border border-border/30 backdrop-blur-sm px-4 text-base shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 placeholder:text-muted-foreground ${
                                  isEditing
                                    ? "bg-background/80"
                                    : "bg-background/40 text-foreground/80"
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Segunda linha: Documento e Telefone */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Documento */}
                    <div>
                      <FormField
                        control={form.control}
                        name="document"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold flex items-center gap-2 text-base">
                              <FileText size={18} className="text-accent" />
                              Documento *
                            </FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                disabled={!isEditing}
                                placeholder="000.000.000-00"
                                maxLength={14}
                                onChange={(e) => {
                                  if (isEditing) {
                                    const formatted = formatDocument(
                                      e.target.value
                                    );
                                    field.onChange(formatted);
                                  }
                                }}
                                className={`h-14 w-full rounded-xl border border-border/30 backdrop-blur-sm px-4 text-base shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 placeholder:text-muted-foreground ${
                                  isEditing
                                    ? "bg-background/80"
                                    : "bg-background/40 text-foreground/80"
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Telefone */}
                    <div>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold flex items-center gap-2 text-base">
                              <Phone size={18} className="text-accent" />
                              Telefone
                            </FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                disabled={!isEditing}
                                placeholder="(11) 99999-9999"
                                maxLength={15}
                                onChange={(e) => {
                                  if (isEditing) {
                                    const formatted = formatPhone(
                                      e.target.value
                                    );
                                    field.onChange(formatted);
                                  }
                                }}
                                className={`h-14 w-full rounded-xl border border-border/30 backdrop-blur-sm px-4 text-base shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 placeholder:text-muted-foreground ${
                                  isEditing
                                    ? "bg-background/80"
                                    : "bg-background/40 text-foreground/80"
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Terceira linha: Plano, Graduação e Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Plano */}
                    <div>
                      <FormField
                        control={form.control}
                        name="planId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold flex items-center gap-2 text-base">
                              <CreditCard size={18} className="text-accent" />
                              Plano
                            </FormLabel>
                            <FormControl>
                              <SelectInput
                                value={field.value || ""}
                                onValueChange={(value) => {
                                  if (isEditing) {
                                    field.onChange(value || undefined);
                                  }
                                }}
                                options={planOptions}
                                placeholder="Selecione o plano"
                                size="lg"
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Graduação */}
                    <div>
                      <FormField
                        control={form.control}
                        name="graduationId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold flex items-center gap-2 text-base">
                              <Award size={18} className="text-accent" />
                              Graduação
                            </FormLabel>
                            <FormControl>
                              <SelectInput
                                value={field.value || ""}
                                onValueChange={(value) => {
                                  if (isEditing) {
                                    field.onChange(value || undefined);
                                  }
                                }}
                                options={graduationOptions}
                                placeholder="Selecione a graduação"
                                size="lg"
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold flex items-center gap-2 text-base">
                              <CheckCircle size={18} className="text-accent" />
                              Status
                            </FormLabel>
                            <FormControl>
                              <SelectInput
                                value={field.value}
                                onValueChange={(value) => {
                                  if (isEditing && value) {
                                    field.onChange(
                                      value as "active" | "inactive"
                                    );
                                  }
                                }}
                                options={statusOptions}
                                placeholder="Selecione o status"
                                size="lg"
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Buttons - Aparece apenas no modo de edição */}
                  {isEditing && (
                    <div className="flex justify-between pt-8">
                      <button
                        type="button"
                        onClick={handleToggleEdit}
                        className="h-14 px-16 rounded-xl border border-border bg-secondary-hover hover:bg-background/80 text-foreground font-semibold transition-all duration-200 hover:shadow-md text-base"
                        disabled={isSubmitting}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-14 px-16 rounded-xl bg-gradient-to-r from-accent to-accent/90 hover:from-accent hover:to-accent text-primary font-bold shadow-lg shadow-accent/30 transition-all duration-200 hover:shadow-xl hover:shadow-accent/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-base"
                      >
                        <Save size={20} />
                        Salvar Alterações
                      </button>
                    </div>
                  )}
                </form>
              </Form>
            </div>
          </div>

          {/* Sidebar de Informações Adicionais */}
          <div className="space-y-6">
            {/* Informações do Plano */}
            <div className="bg-gradient-to-br from-accent/10 via-background/95 to-accent/5 backdrop-blur-sm border border-accent/20 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
                <CreditCard size={20} />
                Plano Assinado
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/60">Nome do Plano</p>
                  <p className="font-semibold text-foreground">
                    {student.plan.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Valor Mensal</p>
                  <p className="font-semibold text-accent text-lg">
                    R$ {student.plan.monthlyFee.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">
                    Próximo Vencimento
                  </p>
                  <p className="font-semibold text-foreground">
                    {getExpirationDate(student.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Informações de Cadastro */}
            <div className="bg-gradient-to-br from-secondary/30 via-background/95 to-secondary/10 backdrop-blur-sm border border-border/30 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-accent" />
                Histórico
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-foreground/60">
                      Data de Cadastro
                    </p>
                    <p className="font-semibold text-foreground text-sm">
                      {formatDate(student.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">
                      Tempo na Academia
                    </p>
                    <p className="font-semibold text-foreground flex items-center gap-2 text-sm">
                      <Clock size={14} className="text-accent" />
                      {getTimeSinceRegistration(student.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-sm text-foreground/60">Tempo Ativo</p>
                    <p className="font-semibold text-foreground flex items-center gap-2 text-sm">
                      {student.activeTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Tempo Inativo</p>
                    <p className="font-semibold text-foreground flex items-center gap-2 text-sm">
                      {student.inactiveTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoadingModal
        open={isSubmitting}
        title="Salvando alterações..."
        description="Estamos processando as alterações nas informações do aluno. Isso pode levar alguns instantes."
      />

      <ErrorModal
        open={errorModal.open}
        title="Erro ao salvar alterações"
        message={errorModal.message}
        details={errorModal.details}
        onClose={handleCloseErrorModal}
        onRetry={handleRetrySubmit}
        showRetry={true}
      />

      <StudentsSuccessModal
        open={showSuccessModal}
        title="Alterações salvas com sucesso!"
        description={`As informações do aluno ${form.getValues("name")} foram atualizadas com sucesso.`}
        onClose={handleCloseSuccessModal}
      />
    </div>
  );
};
