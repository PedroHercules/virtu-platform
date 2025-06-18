"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  CreditCard,
  CheckCircle,
  Award,
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
import { useRouter } from "next/navigation";
import { studentsRoutes } from "@/routes/students";
import { LoadingModal } from "@/components/ui/loading-modal";
import { ErrorModal } from "@/components/ui/error-modal";
import { StudentsSuccessModal } from "./components/success-modal";
import { createStudentService } from "@/services/students/create-student.service";
import {
  CreateStudentFormData,
  createStudentSchema,
} from "@/modules/students/schemas/create-student.schema";
import { PlanEntity } from "@/services/plans/plan";
import { GraduationEntity } from "@/services/graduation/graduation";

interface CreateStudentProps {
  plans: PlanEntity[];
  graduations: GraduationEntity[];
}

export const CreateStudent: React.FC<CreateStudentProps> = ({
  plans,
  graduations,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState<{
    open: boolean;
    message: string;
    details?: string;
  }>({ open: false, message: "", details: undefined });

  const form = useForm<CreateStudentFormData>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      planId: undefined,
      graduationId: undefined,
    },
  });

  // Opções de planos com informações detalhadas
  const planOptions = plans.map((plan) => ({
    value: plan.id,
    label: `${plan.name} - R$ ${plan.price.toFixed(2)}/mês`,
  }));

  // Opções de graduações ordenadas por nível
  const graduationOptions = graduations
    .sort((a, b) => a.level - b.level)
    .map((graduation) => ({
      value: graduation.id,
      label: `${graduation.name} (Nível ${graduation.level})`,
    }));

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

  const onSubmit = async (data: CreateStudentFormData) => {
    setIsSubmitting(true);

    try {
      await createStudentService(data);
      form.reset();
      setShowSuccessModal(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao criar aluno";
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto h-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary border border-border hover:bg-secondary-hover transition-all duration-200 hover:shadow-lg group"
          >
            <ArrowLeft
              size={20}
              className="text-foreground/80 group-hover:text-accent transition-colors"
            />
          </button>
          <div>
            <h1 className="text-3xl font-black text-accent">Novo Aluno</h1>
            <p className="text-foreground/60 font-medium">
              Cadastre um novo aluno na academia
            </p>
          </div>
        </div>

        {/* Main Content - Full Width */}
        <div className="w-full">
          <div className="bg-input border border-border rounded-2xl shadow-xl p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
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
                              placeholder="Digite o nome completo do aluno"
                              className="h-14 w-full rounded-xl border border-border/30 bg-input px-4 text-base shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 placeholder:text-muted-foreground"
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
                              placeholder="Digite o email do aluno"
                              className="h-14 w-full rounded-xl border border-border/30 bg-input px-4 text-base shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 placeholder:text-muted-foreground"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Segunda linha: Telefone, Plano e Graduação */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                              placeholder="(11) 99999-9999"
                              maxLength={15}
                              onChange={(e) => {
                                const formatted = formatPhone(e.target.value);
                                field.onChange(formatted);
                              }}
                              className="h-14 w-full rounded-xl border border-border/30 bg-input px-4 text-base shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 placeholder:text-muted-foreground"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                                field.onChange(value || undefined);
                              }}
                              options={planOptions}
                              placeholder="Selecione o plano (opcional)"
                              size="xl"
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
                                field.onChange(value || undefined);
                              }}
                              options={graduationOptions}
                              placeholder="Selecione a graduação (opcional)"
                              size="xl"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Buttons - Full Width */}
                <div className="flex justify-between pt-8">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="h-14 px-16 rounded-xl border border-border bg-secondary hover:bg-secondary-hover text-foreground font-semibold transition-all duration-200 hover:shadow-md text-base"
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 px-16 rounded-xl bg-accent hover:bg-accent-hover text-accent-foreground font-bold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-base"
                  >
                    <CheckCircle size={20} />
                    Criar Aluno
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoadingModal
        open={isSubmitting}
        title="Criando aluno..."
        description="Estamos processando as informações do novo aluno. Isso pode levar alguns instantes."
      />

      <ErrorModal
        open={errorModal.open}
        title="Erro ao criar aluno"
        message={errorModal.message}
        details={errorModal.details}
        onClose={handleCloseErrorModal}
        onRetry={handleRetrySubmit}
        showRetry={true}
      />

      <StudentsSuccessModal
        open={showSuccessModal}
        title="Aluno criado com sucesso!"
        description={`O aluno ${form.getValues("name")} foi cadastrado com sucesso na academia.`}
        onClose={handleCloseSuccessModal}
      />
    </div>
  );
};
