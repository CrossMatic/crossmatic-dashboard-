import { createClient } from "@/lib/supabase/server";
import LeadStatusDropdown from "@/components/LeadStatusDropdown";
import { ExternalLink } from "lucide-react";

const FG = "hsl(210, 40%, 98%)";
const MUTED = "hsl(215, 20%, 65%)";
const DIM = "hsl(215, 20%, 45%)";
const BORDER = "hsl(220, 30%, 20%)";
const CARD = "hsl(220, 30%, 14%)";
const SECONDARY = "hsl(222, 50%, 7%)";
const ACCENT = "hsl(210, 100%, 65%)";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-CH", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function ArchivPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: allLeads } = await supabase
    .from("leads").select("*").eq("client_id", user!.id).order("week_added", { ascending: false });

  const latestWeek = allLeads?.[0]?.week_added ?? null;
  const leads = latestWeek
    ? (allLeads?.filter((l) => l.week_added !== latestWeek) ?? [])
    : (allLeads ?? []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: FG }}>Archiv</h1>
        <p className="mt-1.5 text-sm" style={{ color: MUTED }}>
          Alle {leads?.length ?? 0} Leads auf einen Blick
        </p>
      </div>

      {leads && leads.length > 0 ? (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: BORDER }}>
          <div className="grid grid-cols-[40px_1fr_140px_160px_130px_100px] gap-4 px-5 py-3 border-b text-xs font-medium uppercase tracking-wider"
            style={{ backgroundColor: SECONDARY, borderColor: BORDER, color: DIM }}>
            <div /><div>Unternehmen</div><div>Branche</div><div>Kontakt</div><div>Status</div><div>Woche</div>
          </div>

          {leads.map((lead) => (
            <div key={lead.id}
              className="grid grid-cols-[40px_1fr_140px_160px_130px_100px] gap-4 px-5 py-4 items-center border-b last:border-0 transition-colors hover:bg-white/5"
              style={{ borderColor: "hsl(220, 30%, 18%)", backgroundColor: CARD }}>

              <div>
                {lead.logo_url ? (
                  <img src={lead.logo_url} alt="" className="w-8 h-8 rounded-md object-contain"
                    style={{ backgroundColor: SECONDARY }} />
                ) : (
                  <div className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: "hsl(210, 100%, 65%, 0.1)", color: ACCENT }}>
                    {lead.company_name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: FG }}>{lead.company_name}</p>
                {lead.website && (
                  <a href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1 hover:underline mt-0.5" style={{ color: ACCENT }}>
                    {lead.website.replace(/^https?:\/\//, "").split("/")[0]}
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>

              <div className="text-xs truncate" style={{ color: MUTED }}>{lead.industry ?? "—"}</div>

              <div className="min-w-0">
                {lead.contact_name ? (
                  <>
                    <p className="text-sm truncate" style={{ color: FG }}>{lead.contact_name}</p>
                    {lead.contact_position && (
                      <p className="text-xs truncate" style={{ color: MUTED }}>{lead.contact_position}</p>
                    )}
                  </>
                ) : <span className="text-xs" style={{ color: DIM }}>—</span>}
              </div>

              <div><LeadStatusDropdown leadId={lead.id} initialStatus={lead.status} /></div>

              <div className="text-xs" style={{ color: MUTED }}>
                {lead.week_added ? formatDate(lead.week_added) : "—"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 p-16 text-center flex flex-col items-center gap-4"
          style={{ backgroundColor: "#0d1118" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: "hsl(210, 100%, 65%, 0.1)" }}>📁</div>
          <div>
            <p className="text-base font-semibold mb-1" style={{ color: FG }}>Noch keine Leads im Archiv</p>
            <p className="text-sm" style={{ color: MUTED }}>Alle gelieferten Leads erscheinen hier in der Übersicht.</p>
          </div>
        </div>
      )}
    </div>
  );
}
