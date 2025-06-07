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
    <aside className="flex h-screen w-72 flex-col bg-background border-r border-border shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 p-6 border-b border-border">
        <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
          <span className="text-accent-foreground font-bold text-lg">V</span>
        </div>
        <h1 className="text-xl font-semibold text-foreground">Virtu</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              {item.disabled ? (
                <div className="flex items-center gap-3 px-3 py-2 text-foreground/40 cursor-not-allowed opacity-50">
                  <div className="flex items-center justify-center w-5 h-5">
                    <item.icon size={18} />
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.path
                      ? "bg-accent/15 text-accent border-l-4 border-accent"
                      : "text-foreground/80 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-center w-5 h-5">
                    <item.icon size={18} />
                  </div>
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-foreground font-medium text-sm">
                {session?.user?.username?.[0]?.toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground truncate max-w-[140px]">
                {session?.user?.username}
              </span>
              <span className="text-xs text-foreground/60">Instrutor</span>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-foreground/60 hover:bg-destructive/10 hover:text-destructive transition-colors"
            title="Sair"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
