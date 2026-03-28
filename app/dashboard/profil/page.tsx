import { createClient } from "@/lib/supabase/server";
import { Building2, Mail, Shield } from "lucide-react";

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("agency_name, contact_email")
    .eq("id", user!.id)
    .single();

  const { count: leadsTotal } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("client_id", user!.id);

  return (
    <div className="space-y-8 max-w-lg">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "hsl(210, 40%, 98%)" }}>
          Mein Profil
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: "hsl(215, 20%, 55%)" }}>
          Ihre Kontodaten bei CrossMatic
        </p>
      </div>

      {/* Info Card */}
      <div
        className="rounded-xl border divide-y"
        style={{ borderColor: "hsl(220, 30%, 20%)", background: "hsl(220, 30%, 11%)" }}
      >
        <div className="px-6 py-5 flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "hsl(210, 100%, 65%, 0.12)" }}
          >
            <Building2 size={18} style={{ color: "hsl(210, 100%, 65%)" }} />
          </div>
          <div>
            <p className="text-xs mb-0.5" style={{ color: "hsl(215, 20%, 45%)" }}>Firmenname</p>
            <p className="text-sm font-medium" style={{ color: "hsl(210, 40%, 95%)" }}>
              {profile?.agency_name ?? "—"}
            </p>
          </div>
        </div>

        <div className="px-6 py-5 flex items-center gap-4" style={{ borderColor: "hsl(220, 30%, 18%)" }}>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "hsl(210, 100%, 65%, 0.12)" }}
          >
            <Mail size={18} style={{ color: "hsl(210, 100%, 65%)" }} />
          </div>
          <div>
            <p className="text-xs mb-0.5" style={{ color: "hsl(215, 20%, 45%)" }}>E-Mail</p>
            <p className="text-sm font-medium" style={{ color: "hsl(210, 40%, 95%)" }}>
              {profile?.contact_email ?? user?.email ?? "—"}
            </p>
          </div>
        </div>

        <div className="px-6 py-5 flex items-center gap-4" style={{ borderColor: "hsl(220, 30%, 18%)" }}>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "hsl(210, 100%, 65%, 0.12)" }}
          >
            <Shield size={18} style={{ color: "hsl(210, 100%, 65%)" }} />
          </div>
          <div>
            <p className="text-xs mb-0.5" style={{ color: "hsl(215, 20%, 45%)" }}>Passwort</p>
            <p className="text-sm" style={{ color: "hsl(215, 20%, 55%)" }}>
              ••••••••••••
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        className="rounded-xl border px-6 py-5 flex items-center justify-between"
        style={{ borderColor: "hsl(220, 30%, 20%)", background: "hsl(220, 30%, 11%)" }}
      >
        <p className="text-sm" style={{ color: "hsl(215, 20%, 55%)" }}>
          Leads gesamt erhalten
        </p>
        <span className="text-2xl font-bold" style={{ color: "hsl(210, 100%, 65%)" }}>
          {leadsTotal ?? 0}
        </span>
      </div>

      {/* Support */}
      <div
        className="rounded-xl border px-6 py-5"
        style={{ borderColor: "hsl(220, 30%, 20%)", background: "hsl(220, 30%, 11%)" }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: "hsl(210, 40%, 90%)" }}>
          Support & Kontakt
        </p>
        <p className="text-sm" style={{ color: "hsl(215, 20%, 55%)" }}>
          Bei Fragen oder Änderungswünschen wenden Sie sich direkt an CrossMatic.
        </p>
        <a
          href="mailto:support@getcrossmatic.com"
          className="text-sm mt-2 inline-block hover:underline"
          style={{ color: "hsl(210, 100%, 65%)" }}
        >
          support@getcrossmatic.com
        </a>
      </div>
    </div>
  );
}
