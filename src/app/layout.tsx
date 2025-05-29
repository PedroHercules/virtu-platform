import "@/styles/reset.css";
import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/components/providers/next-auth.provider";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Virtu Platform",
  description: "Plataforma Virtu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextAuthProvider>
          {children}
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
