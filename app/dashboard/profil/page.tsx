import { createClient } from "@/lib/supabase/server";
import { Building2, Mail, Shield } from "lucide-react";

const FG = "hsl(210, 40%, 98%)";
const MUTED = "hsl(215, 20%, 65%)";
const DIM = "hsl(215, 20%, 45%)";
const BORDER = "hsl(220, 10%, 22%)";
const CARD = "hsl(220, 8%, 15%)";
const SECONDARY = "hsl(220, 8%, 18%)";
const ACCENT = "hsl(210, 100%, 65%)";

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles").select("agency_name, contact_email").eq("id", user!.id).single();

  const { count: leadsTotal } = await supabase
    .from("leads").select("*", { count: "exact", head: true }).eq("client_id", user!.id);

  const infoItems = [
    { icon: Building2, label: "Firmenname", value: profile?.agency_name ?? "—" },
    { icon: Mail, label: "E-Mail", value: profile?.contact_email ?? user?.email ?? "—" },
    { icon: Shield, label: "Passwort", value: "••••••••••••", dim: true },
  ];

  return (
    <div className="space-y-8 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: FG }}>Mein Profil</h1>
        <p className="mt-1.5 text-sm" style={{ color: MUTED }}>Ihre Kontodaten bei CrossMatic</p>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ borderColor: BORDER }}>
        {infoItems.map(({ icon: Icon, label, value, dim }, i) => (
          <div key={label} className="px-6 py-5 flex items-center gap-4"
            style={{
              borderBottom: i < infoItems.length - 1 ? `1px solid hsl(220, 10%, 20%)` : "none",
              backgroundColor: CARD,
            }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: SECONDARY }}>
              <Icon size={18} style={{ color: DIM }} />
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: DIM }}>{label}</p>
              <p className="text-sm font-medium" style={{ color: dim ? DIM : FG }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border px-6 py-5 flex items-center justify-between"
        style={{ borderColor: BORDER, backgroundColor: CARD }}>
        <p className="text-sm" style={{ color: MUTED }}>Leads gesamt erhalten</p>
        <span className="text-2xl font-bold" style={{ color: FG }}>{leadsTotal ?? 0}</span>
      </div>

      <div className="rounded-xl border px-6 py-5" style={{ borderColor: BORDER, backgroundColor: CARD }}>
        <p className="text-sm font-medium mb-1" style={{ color: FG }}>Support & Kontakt</p>
        <p className="text-sm" style={{ color: MUTED }}>
          Bei Fragen oder Änderungswünschen wenden Sie sich direkt an CrossMatic.
        </p>
        <a href="mailto:support@getcrossmatic.com"
          className="text-sm mt-2 inline-block hover:underline" style={{ color: ACCENT }}>
          support@getcrossmatic.com
        </a>
      </div>
    </div>
  );
}
