"use client";

import {
  dashboardRoutes,
  studentsRoutes,
  graduationsRoutes,
  paymentsRoutes,
} from "@/routes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  LayoutDashboard,
  Users,
  GraduationCap,
  Wallet,
  Crown,
} from "lucide-react";

export const Sidebar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      path: dashboardRoutes.dashboard,
      icon: LayoutDashboard,
      disabled: false,
    },
    {
      name: "Alunos",
      path: studentsRoutes.students,
      icon: Users,
      disabled: false,
    },
    {
      name: "Graduações",
      path: graduationsRoutes.graduations,
      icon: GraduationCap,
      disabled: true,
    },
    {
      name: "Pagamentos",
      path: paymentsRoutes.payments,
      icon: Wallet,
      disabled: true,
    },
  ];

  return (
    <aside className="flex h-screen w-72 flex-col bg-gradient-to-b from-background via-primary to-secondary relative overflow-hidden border-r-2 border-accent/30">
      {/* Martial Arts Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-accent rotate-45 rounded-lg" />
        <div className="absolute top-40 right-8 w-24 h-24 border border-accent rotate-12" />
        <div className="absolute bottom-40 left-6 w-28 h-28 border border-accent/50 rotate-45 rounded-full" />
        <div className="absolute bottom-20 right-12 w-20 h-20 border-2 border-accent/70 rotate-12" />
      </div>

      {/* Header - Academy Style */}
      <div className="relative z-10 p-6 border-b-2 border-accent/20 bg-gradient-to-r from-primary/50 to-secondary/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-2xl shadow-accent/40 border-4 border-accent/30 group-hover:scale-105 transition-all duration-700">
              <Crown size={22} className="text-primary" />
            </div>
            {/* Belt indicator */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-2 bg-gradient-to-r from-accent via-yellow-500 to-accent rounded-full border border-accent/50" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-accent tracking-wider uppercase">
              Virtu
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation - Combat Menu */}
      <nav className="flex-1 px-5 py-4 relative z-10">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path} className="group">
              {item.disabled ? (
                <div className="relative flex cursor-not-allowed items-center gap-4 rounded-lg px-4 py-3 opacity-40 transition-all duration-300 border border-foreground/10">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-foreground/10 to-foreground/5 border border-foreground/20">
                    <item.icon size={18} className="text-foreground/50" />
                  </div>
                  <span className="font-bold text-foreground/50 text-sm tracking-wide flex-1">
                    {item.name}
                  </span>
                  {/* Rank indicator for disabled */}
                  <div className="ml-auto flex flex-col gap-0.5">
                    <div className="w-6 h-0.5 bg-foreground/20 rounded-full" />
                    <div className="w-4 h-0.5 bg-foreground/20 rounded-full" />
                    <div className="w-3 h-0.5 bg-foreground/20 rounded-full" />
                  </div>
                </div>
              ) : (
                <Link
                  href={item.path}
                  className={`relative flex items-center gap-4 rounded-lg px-4 py-3 transition-all duration-500 border-2 group-hover:scale-[1.01] group-hover:shadow-lg ${
                    pathname === item.path
                      ? "bg-gradient-to-r from-accent/20 via-accent/15 to-accent/10 border-accent/50 shadow-xl shadow-accent/20"
                      : "border-transparent hover:border-accent/30 hover:bg-secondary/40 hover:shadow-md hover:shadow-accent/10"
                  }`}
                >
                  {/* Active indicator */}
                  {pathname === item.path && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-accent via-yellow-500 to-accent rounded-r-lg" />
                  )}

                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-500 border-2 ${
                      pathname === item.path
                        ? "bg-gradient-to-br from-accent/30 to-accent/20 border-accent/60 shadow-lg shadow-accent/30 scale-105 rotate-12"
                        : "bg-gradient-to-br from-foreground/10 to-foreground/5 border-foreground/20 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:scale-105 group-hover:rotate-6"
                    }`}
                  >
                    <item.icon
                      size={18}
                      className={`transition-all duration-500 ${
                        pathname === item.path
                          ? "text-accent"
                          : "text-foreground/80 group-hover:text-accent"
                      }`}
                    />
                  </div>

                  <span
                    className={`font-bold text-sm tracking-wide transition-colors duration-300 flex-1 ${
                      pathname === item.path
                        ? "text-accent"
                        : "text-foreground/90 group-hover:text-accent"
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Rank visualization */}
                  <div className="ml-auto flex flex-col gap-0.5">
                    <div
                      className={`h-0.5 rounded-full transition-all duration-300 ${
                        pathname === item.path
                          ? "w-6 bg-accent"
                          : "w-5 bg-foreground/30 group-hover:bg-accent/60 group-hover:w-6"
                      }`}
                    />
                    <div
                      className={`h-0.5 rounded-full transition-all duration-300 delay-75 ${
                        pathname === item.path
                          ? "w-4 bg-accent/80"
                          : "w-3 bg-foreground/20 group-hover:bg-accent/40 group-hover:w-4"
                      }`}
                    />
                    <div
                      className={`h-0.5 rounded-full transition-all duration-300 delay-150 ${
                        pathname === item.path
                          ? "w-3 bg-accent/60"
                          : "w-2 bg-foreground/10 group-hover:bg-accent/20 group-hover:w-3"
                      }`}
                    />
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Professor/Instructor Section */}
      <div className="relative z-10 p-5 border-t-2 border-accent/30 bg-gradient-to-r from-primary/60 via-secondary/40 to-primary/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-accent via-accent/90 to-accent/70 flex items-center justify-center text-primary font-black text-base shadow-xl shadow-accent/40 border-3 border-accent/40 group-hover:scale-110 transition-all duration-500">
                {session?.user?.username?.[0]?.toUpperCase()}
              </div>

              {/* Professor rank indicators */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-primary flex items-center justify-center">
                <span className="text-xs text-primary font-bold">★</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-black text-foreground tracking-wide truncate max-w-[140px]">
                {session?.user?.username}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400 font-bold uppercase tracking-wider">
                  No tatame
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => signOut()}
            className="group flex items-center justify-center w-10 h-10 rounded-lg text-foreground/70 transition-all duration-500 hover:bg-red-500/15 hover:text-red-400 hover:scale-110 hover:rotate-180 border-2 border-transparent hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/30"
            title="Sair da Academia"
          >
            <LogOut
              size={18}
              className="group-hover:scale-125 transition-all duration-500"
            />
          </button>
        </div>
      </div>

      {/* Traditional border decoration */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20" />
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20" />
    </aside>
  );
};
