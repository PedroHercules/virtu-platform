"use client";

import { homeRoutes } from "@/routes/home";
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
      path: homeRoutes.dashboard,
      icon: LayoutDashboard,
      disabled: false,
    },
    { name: "Alunos", path: homeRoutes.students, icon: Users, disabled: false },
    {
      name: "Graduações",
      path: homeRoutes.graduations,
      icon: GraduationCap,
      disabled: true,
    },
    {
      name: "Pagamentos",
      path: homeRoutes.payments,
      icon: Wallet,
      disabled: true,
    },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col bg-gradient-to-b from-muted to-background p-5 border-r border-border">
      <div className="mb-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
          Virtu
        </h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1.5">
          {menuItems.map((item) => (
            <li key={item.path}>
              {item.disabled ? (
                <div className="flex cursor-not-allowed items-center gap-3 rounded-lg px-4 py-3 opacity-40">
                  <item.icon size={18} className="text-foreground" />
                  <span className="font-medium text-foreground text-sm">
                    {item.name}
                  </span>
                </div>
              ) : (
                <Link
                  href={item.path}
                  className={`group flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                    pathname === item.path
                      ? "bg-accent/10 text-accent"
                      : "text-foreground/70 hover:bg-accent/5 hover:text-accent"
                  }`}
                >
                  <item.icon
                    size={18}
                    className={`transition-transform duration-200 ${
                      pathname === item.path
                        ? "text-accent"
                        : "text-foreground/70 group-hover:text-accent"
                    }`}
                  />
                  <span className="font-medium text-sm">{item.name}</span>
                  {pathname === item.path && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center text-white font-medium">
              {session?.user?.username?.[0]?.toUpperCase()}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-accent" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {session?.user?.username}
            </span>
            <span className="text-xs text-foreground/60">Online</span>
          </div>
        </div>

        <button
          onClick={() => signOut()}
          className="flex items-center justify-center rounded-lg p-2 text-foreground/70 transition-colors hover:bg-accent/10 hover:text-accent"
          title="Sair"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};
