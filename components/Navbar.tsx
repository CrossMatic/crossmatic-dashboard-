"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface NavbarProps {
  agencyName: string;
}

export default function Navbar({ agencyName }: NavbarProps) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header
      className="border-b sticky top-0 z-50"
      style={{
        background: "hsl(222, 50%, 7%)",
        borderColor: "hsl(220, 30%, 20%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <span className="text-lg font-bold tracking-tight">
          Cross<span style={{ color: "hsl(210, 100%, 65%)" }}>Matic</span>
        </span>

        {/* Rechte Seite */}
        <div className="flex items-center gap-4">
          <span
            className="text-sm hidden sm:block"
            style={{ color: "hsl(215, 20%, 65%)" }}
          >
            {agencyName}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-1.5 rounded-md border transition-colors hover:opacity-80 cursor-pointer"
            style={{
              borderColor: "hsl(220, 30%, 25%)",
              color: "hsl(215, 20%, 65%)",
            }}
          >
            Abmelden
          </button>
        </div>
      </div>
    </header>
  );
}
