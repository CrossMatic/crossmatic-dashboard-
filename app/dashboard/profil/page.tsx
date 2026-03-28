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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mein Profil</h1>
        <p className="mt-1.5 text-sm text-gray-500">Ihre Kontodaten bei CrossMatic</p>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
        <div className="px-6 py-5 flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "hsl(210, 100%, 55%, 0.08)" }}
          >
            <Building2 size={18} style={{ color: "hsl(210, 100%, 50%)" }} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Firmenname</p>
            <p className="text-sm font-medium text-gray-800">{profile?.agency_name ?? "—"}</p>
          </div>
        </div>

        <div className="px-6 py-5 flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "hsl(210, 100%, 55%, 0.08)" }}
          >
            <Mail size={18} style={{ color: "hsl(210, 100%, 50%)" }} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">E-Mail</p>
            <p className="text-sm font-medium text-gray-800">
              {profile?.contact_email ?? user?.email ?? "—"}
            </p>
          </div>
        </div>

        <div className="px-6 py-5 flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "hsl(210, 100%, 55%, 0.08)" }}
          >
            <Shield size={18} style={{ color: "hsl(210, 100%, 50%)" }} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Passwort</p>
            <p className="text-sm text-gray-400">••••••••••••</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl border border-gray-100 px-6 py-5 flex items-center justify-between">
        <p className="text-sm text-gray-500">Leads gesamt erhalten</p>
        <span className="text-2xl font-bold" style={{ color: "hsl(210, 100%, 50%)" }}>
          {leadsTotal ?? 0}
        </span>
      </div>

      {/* Support */}
      <div className="bg-white rounded-xl border border-gray-100 px-6 py-5">
        <p className="text-sm font-medium text-gray-800 mb-1">Support & Kontakt</p>
        <p className="text-sm text-gray-500">
          Bei Fragen oder Änderungswünschen wenden Sie sich direkt an CrossMatic.
        </p>
        <a
          href="mailto:support@getcrossmatic.com"
          className="text-sm mt-2 inline-block hover:underline"
          style={{ color: "hsl(210, 100%, 50%)" }}
        >
          support@getcrossmatic.com
        </a>
      </div>
    </div>
  );
}
