import { createClient } from "@/lib/supabase/server";
import { Building2, Mail, Shield } from "lucide-react";

const TEXT = "hsl(210, 40%, 98%)";
const TEXT_MUTED = "hsl(215, 20%, 65%)";
const TEXT_DIM = "hsl(215, 20%, 45%)";
const BORDER = "hsl(220, 30%, 20%)";
const CARD_BG = "hsl(222, 50%, 9%)";
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
        <h1 className="text-2xl font-bold" style={{ color: TEXT }}>Mein Profil</h1>
        <p className="mt-1.5 text-sm" style={{ color: TEXT_MUTED }}>Ihre Kontodaten bei CrossMatic</p>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ borderColor: BORDER }}>
        {infoItems.map(({ icon: Icon, label, value, dim }, i) => (
          <div key={label} className="px-6 py-5 flex items-center gap-4"
            style={{ borderBottom: i < infoItems.length - 1 ? `1px solid hsl(220, 30%, 16%)` : "none", background: CARD_BG }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "hsl(220, 30%, 14%)" }}>
              <Icon size={18} style={{ color: TEXT_DIM }} />
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: TEXT_DIM }}>{label}</p>
              <p className="text-sm font-medium" style={{ color: dim ? TEXT_DIM : TEXT_MUTED }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border px-6 py-5 flex items-center justify-between"
        style={{ borderColor: BORDER, background: CARD_BG }}>
        <p className="text-sm" style={{ color: TEXT_MUTED }}>Leads gesamt erhalten</p>
        <span className="text-2xl font-bold" style={{ color: TEXT }}>{leadsTotal ?? 0}</span>
      </div>

      <div className="rounded-xl border px-6 py-5" style={{ borderColor: BORDER, background: CARD_BG }}>
        <p className="text-sm font-medium mb-1" style={{ color: TEXT }}>Support & Kontakt</p>
        <p className="text-sm" style={{ color: TEXT_MUTED }}>
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
