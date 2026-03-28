import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("agency_name")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      <Sidebar agencyName={profile?.agency_name ?? user.email ?? "Kunde"} />

      {/* Mobile top bar */}
      <div className="md:hidden h-14 flex items-center px-5 sticky top-0 z-40 border-b"
        style={{ background: "#111111", borderColor: "#2a2a2a" }}>
        <span className="text-lg font-bold tracking-tight text-white">
          Cross<span style={{ color: "hsl(210, 100%, 60%)" }}>Matic</span>
        </span>
      </div>

      <main className="md:ml-56 px-5 sm:px-8 py-10 pb-28 md:pb-12 max-w-5xl">
        {children}
      </main>
    </div>
  );
}
