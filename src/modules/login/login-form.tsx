"use client";

import * as React from "react";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div className="flex flex-col items-center w-full">
      <div className="text-center mb-16">
        <h1 className="text-7xl font-bold text-foreground mb-8">Virtu</h1>
        <p className="text-xl text-foreground/80 tracking-wide">
          Acesse sua conta na Plataforma Virtu
        </p>
      </div>

      <form
        className="flex flex-col gap-8 w-full"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Input
          label="E-mail"
          type="email"
          id="email"
          size="lg"
          fullWidth
          required
          placeholder="Digite seu e-mail"
          {...form.register("email")}
        />

        <Input
          label="Senha"
          type="password"
          id="password"
          size="lg"
          fullWidth
          required
          placeholder="Digite sua senha"
          {...form.register("password")}
        />

        <Button variant="primary" size="lg" className="mt-2">
          Acessar plataforma
        </Button>
      </form>
    </div>
  );
};
