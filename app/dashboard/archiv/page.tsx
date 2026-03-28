import { createClient } from "@/lib/supabase/server";
import LeadStatusDropdown from "@/components/LeadStatusDropdown";
import { ExternalLink } from "lucide-react";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-CH", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function ArchivPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: leads } = await supabase
    .from("leads").select("*")
    .eq("client_id", user!.id)
    .order("week_added", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Archiv</h1>
        <p className="mt-1.5 text-sm" style={{ color: "#52525b" }}>
          Alle {leads?.length ?? 0} Leads auf einen Blick
        </p>
      </div>

      {leads && leads.length > 0 ? (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#2a2a2a" }}>
          <div className="grid grid-cols-[40px_1fr_140px_160px_130px_100px] gap-4 px-5 py-3 border-b text-xs font-medium uppercase tracking-wider"
            style={{ background: "#111111", borderColor: "#2a2a2a", color: "#3f3f46" }}>
            <div /><div>Unternehmen</div><div>Branche</div><div>Kontakt</div><div>Status</div><div>Woche</div>
          </div>

          {leads.map((lead) => (
            <div key={lead.id}
              className="grid grid-cols-[40px_1fr_140px_160px_130px_100px] gap-4 px-5 py-4 items-center border-b transition-colors hover:bg-white/[0.02]"
              style={{ borderColor: "#1f1f1f", background: "#1a1a1a" }}>

              <div>
                {lead.logo_url ? (
                  <img src={lead.logo_url} alt="" className="w-8 h-8 rounded-md object-contain"
                    style={{ background: "#262626" }} />
                ) : (
                  <div className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                    style={{ background: "rgba(255,255,255,0.05)", color: "#71717a" }}>
                    {lead.company_name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{lead.company_name}</p>
                {lead.website && (
                  <a href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1 hover:underline mt-0.5"
                    style={{ color: "hsl(210,100%,65%)" }}>
                    {lead.website.replace(/^https?:\/\//, "").split("/")[0]}
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>

              <div className="text-xs truncate" style={{ color: "#52525b" }}>{lead.industry ?? "—"}</div>

              <div className="min-w-0">
                {lead.contact_name ? (
                  <>
                    <p className="text-sm truncate" style={{ color: "#a1a1aa" }}>{lead.contact_name}</p>
                    {lead.contact_position && (
                      <p className="text-xs truncate" style={{ color: "#52525b" }}>{lead.contact_position}</p>
                    )}
                  </>
                ) : <span className="text-xs" style={{ color: "#3f3f46" }}>—</span>}
              </div>

              <div><LeadStatusDropdown leadId={lead.id} initialStatus={lead.status} /></div>

              <div className="text-xs" style={{ color: "#52525b" }}>
                {lead.week_added ? formatDate(lead.week_added) : "—"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border p-16 text-center flex flex-col items-center gap-4"
          style={{ borderColor: "#2a2a2a", background: "#111111" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: "rgba(255,255,255,0.04)" }}>📁</div>
          <div>
            <p className="text-base font-semibold text-white mb-1">Noch keine Leads im Archiv</p>
            <p className="text-sm" style={{ color: "#52525b" }}>Alle gelieferten Leads erscheinen hier in der Übersicht.</p>
          </div>
        </div>
      )}
    </div>
  );
}
