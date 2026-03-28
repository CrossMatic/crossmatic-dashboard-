"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Target, Archive, User, LogOut } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Leads", icon: Target },
  { href: "/dashboard/archiv", label: "Archiv", icon: Archive },
  { href: "/dashboard/profil", label: "Profil", icon: User },
];

export default function Sidebar({ agencyName }: { agencyName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-56 border-r z-40 bg-white border-gray-100">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0">
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Cross<span style={{ color: "hsl(210, 100%, 55%)" }}>Matic</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: isActive ? "hsl(210, 100%, 55%, 0.08)" : "transparent",
                  color: isActive ? "hsl(210, 100%, 50%)" : "#6b7280",
                }}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <div className="px-3 pb-1">
            <p className="text-xs text-gray-400 mb-0.5">Eingeloggt als</p>
            <p className="text-sm font-medium text-gray-800 truncate">{agencyName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 transition-colors hover:text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <LogOut size={15} />
            Abmelden
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 flex bg-white">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center py-3 gap-1 text-xs font-medium transition-colors"
              style={{ color: isActive ? "hsl(210, 100%, 50%)" : "#9ca3af" }}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
