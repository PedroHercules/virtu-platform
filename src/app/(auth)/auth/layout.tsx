import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Plataforma Virtu",
  description: "Acesse sua conta na Plataforma Virtu",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
