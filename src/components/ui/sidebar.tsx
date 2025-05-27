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
    <aside className="flex h-screen w-64 flex-col bg-gray-800 p-4 text-white">
      <div className="mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-xl font-bold">Virtu</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              {item.disabled ? (
                <div className="flex cursor-not-allowed items-center gap-3 rounded-lg px-4 py-2.5 opacity-50">
                  <item.icon size={20} className="text-gray-400" />
                  <span className="font-medium text-gray-400">{item.name}</span>
                </div>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 transition-colors ${
                    pathname === item.path
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center justify-between border-t border-gray-700 pt-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-600" />
          <span className="text-sm font-medium">{session?.user?.username}</span>
        </div>

        <button
          onClick={() => signOut()}
          className="flex items-center justify-center rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
          title="Sair"
        >
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
};
