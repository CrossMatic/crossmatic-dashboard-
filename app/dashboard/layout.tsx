export const unstable_instant = false;

import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <Sidebar />

      {/* Mobile top bar */}
      <div className="md:hidden h-14 flex items-center px-5 sticky top-0 z-40 border-b border-border bg-background">
        <Image src="/crossmatic-logo.png" alt="CrossMatic" width={120} height={30} className="object-contain" priority />
      </div>

      <main className="md:ml-56 px-5 sm:px-8 py-10 pb-28 md:pb-12 max-w-5xl">
        {children}
      </main>
    </div>
  );
}
