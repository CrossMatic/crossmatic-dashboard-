import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("agency_name")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen" style={{ background: "hsl(222, 50%, 7%)" }}>
      <Navbar agencyName={profile?.agency_name ?? user.email ?? "Kunde"} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {children}
      </main>
    </div>
  );
}
