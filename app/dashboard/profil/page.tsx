import { createClient } from "@/lib/supabase/server";
import { Building2, Mail, Shield } from "lucide-react";

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles").select("agency_name, contact_email")
    .eq("id", user!.id).single();

  const { count: leadsTotal } = await supabase
    .from("leads").select("*", { count: "exact", head: true })
    .eq("client_id", user!.id);

  const infoItems = [
    { icon: Building2, label: "Firmenname", value: profile?.agency_name ?? "—" },
    { icon: Mail, label: "E-Mail", value: profile?.contact_email ?? user?.email ?? "—" },
    { icon: Shield, label: "Passwort", value: "••••••••••••" },
  ];

  return (
    <div className="space-y-8 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-white">Mein Profil</h1>
        <p className="mt-1.5 text-sm" style={{ color: "#52525b" }}>Ihre Kontodaten bei CrossMatic</p>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#2a2a2a" }}>
        {infoItems.map(({ icon: Icon, label, value }, i) => (
          <div key={label}
            className="px-6 py-5 flex items-center gap-4"
            style={{ borderBottom: i < infoItems.length - 1 ? "1px solid #1f1f1f" : "none", background: "#1a1a1a" }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "rgba(255,255,255,0.05)" }}>
              <Icon size={18} style={{ color: "#52525b" }} />
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#3f3f46" }}>{label}</p>
              <p className="text-sm font-medium" style={{ color: label === "Passwort" ? "#3f3f46" : "#e4e4e7" }}>
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border px-6 py-5 flex items-center justify-between"
        style={{ borderColor: "#2a2a2a", background: "#1a1a1a" }}>
        <p className="text-sm" style={{ color: "#52525b" }}>Leads gesamt erhalten</p>
        <span className="text-2xl font-bold text-white">{leadsTotal ?? 0}</span>
      </div>

      <div className="rounded-xl border px-6 py-5" style={{ borderColor: "#2a2a2a", background: "#1a1a1a" }}>
        <p className="text-sm font-medium text-white mb-1">Support & Kontakt</p>
        <p className="text-sm" style={{ color: "#52525b" }}>
          Bei Fragen oder Änderungswünschen wenden Sie sich direkt an CrossMatic.
        </p>
        <a href="mailto:support@getcrossmatic.com"
          className="text-sm mt-2 inline-block hover:underline" style={{ color: "hsl(210,100%,65%)" }}>
          support@getcrossmatic.com
        </a>
      </div>
    </div>
  );
}
