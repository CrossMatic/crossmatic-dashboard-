"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Target, Archive, LogOut } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Leads", icon: Target },
  { href: "/dashboard/archiv", label: "Archiv", icon: Archive },
];

export default function Sidebar({ agencyName, email }: { agencyName: string; email: string }) {
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
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-56 border-r z-40"
        style={{ backgroundColor: "hsl(222, 50%, 7%)", borderColor: "hsl(220, 30%, 20%)" }}>

        <div className="h-16 flex items-center px-6 border-b shrink-0"
          style={{ borderColor: "hsl(220, 30%, 20%)" }}>
          <Image src="/crossmatic-logo.png" alt="CrossMatic" width={140} height={36} className="object-contain" priority />
        </div>

        <nav className="flex-1 px-3 py-5 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} prefetch={true}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  backgroundColor: isActive ? "hsl(220, 30%, 14%)" : "transparent",
                  color: isActive ? "hsl(210, 40%, 98%)" : "hsl(215, 20%, 65%)",
                }}>
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-2" style={{ borderColor: "hsl(220, 30%, 20%)" }}>
          <div className="px-3 pb-1">
            <p className="text-xs mb-0.5" style={{ color: "hsl(215, 20%, 45%)" }}>Eingeloggt als</p>
            <p className="text-xs font-medium truncate" style={{ color: "hsl(210, 40%, 98%)" }}>{email}</p>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5 cursor-pointer"
            style={{ color: "hsl(215, 20%, 45%)" }}>
            <LogOut size={15} />
            Abmelden
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t flex"
        style={{ backgroundColor: "hsl(222, 50%, 7%)", borderColor: "hsl(220, 30%, 20%)" }}>
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} prefetch={true}
              className="flex-1 flex flex-col items-center py-3 gap-1 text-xs font-medium"
              style={{ color: isActive ? "hsl(210, 40%, 98%)" : "hsl(215, 20%, 45%)" }}>
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
