"use client";

import * as React from "react";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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

      console.log("Login bem-sucedido:", response);

      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      // Aqui você pode adicionar lógica para lidar com erros, como exibir uma mensagem de erro
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
        className="flex flex-col gap-10 w-full"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="space-y-4">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-foreground/90"
          >
            E-mail
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="Digite seu e-mail"
            className="block w-full px-6 py-4 bg-input/50 border border-accent/20 rounded-lg text-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 text-foreground placeholder:text-foreground/40 transition-colors"
            {...form.register("email")}
          />
        </div>
        <div className="space-y-4">
          <label
            htmlFor="password"
            className="block text-lg font-medium text-foreground/90"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            required
            placeholder="Digite sua senha"
            className="block w-full px-6 py-4 bg-input/50 border border-accent/20 rounded-lg text-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 text-foreground placeholder:text-foreground/40 transition-colors"
            {...form.register("password")}
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full px-8 py-4 bg-accent hover:bg-accent-hover text-background font-medium rounded-lg text-xl transition-colors shadow-lg hover:shadow-xl"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};
