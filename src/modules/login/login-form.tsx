"use client";

import * as React from "react";
import * as z from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const LoginForm: React.FC = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      router.push("/");

      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao fazer login"
      );
    }
  };
  return (
    <div className="flex min-h-screen w-full overflow-hidden relative bg-gradient-to-br from-background via-muted to-primary">
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      <div className="w-full flex flex-col justify-center items-center p-8 lg:p-16 relative z-10">
        <div className="w-full max-w-md space-y-8 animate-fade-in bg-background/40 p-8 rounded-2xl border border-accent/5 shadow-2xl backdrop-blur-sm">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-accent to-accent-foreground bg-clip-text text-transparent">
              Virtu
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Acesse sua conta na Plataforma Virtu
            </p>
          </div>

          <Form {...form}>
            <form
              className="flex flex-col gap-6 mt-8"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="space-y-6 relative">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          label="E-mail"
                          type="email"
                          id="email"
                          required
                          className="h-12 px-4 bg-primary-hover transition-all focus:border-accent"
                          placeholder="Digite seu e-mail"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          label="Senha"
                          type="password"
                          id="password"
                          required
                          className="h-12 px-4 bg-primary-hover transition-all focus:border-accent"
                          placeholder="Digite sua senha"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4 mt-2">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full h-12 text-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-accent/80 via-accent to-accent/80 hover:opacity-90"
                >
                  Acessar plataforma
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <Link
                    href="/auth/forgot-password"
                    className="hover:text-accent transition-colors"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground italic">
              &ldquo;Seja como a água, meu amigo&rdquo;
              <span className="block text-xs mt-1 text-muted-foreground/60">
                - Bruce Lee
              </span>
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              © 2025 Virtu - Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
