import * as React from "react";
import Image from "next/image";
import { LoginForm } from "../../modules/login/login-form";

export const LoginLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Lado esquerdo - Ilustração */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-start py-8 pl-8 relative overflow-hidden">
        {/* Efeito de luz sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(191,143,48,0.05),transparent_70%)]" />

        {/* Container da ilustração */}
        <div className="w-[750px] h-[850px] bg-muted/50 rounded-xl border border-accent/20 shadow-2xl relative overflow-hidden">
          {/* Gradiente elegante */}
          <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent rounded-xl" />
          {/* Texto sobreposto */}
          <Image
            src="/illustration-login.png"
            alt="Ilustração de artes marciais"
            width={750}
            height={850}
            className="object-cover object-center rounded-xl"
            priority
          />
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-12 py-8">
        <div className="w-full max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
