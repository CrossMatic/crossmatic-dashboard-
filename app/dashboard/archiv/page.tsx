import { createClient } from "@/lib/supabase/server";
import LeadStatusDropdown from "@/components/LeadStatusDropdown";
import { ExternalLink } from "lucide-react";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function ArchivPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .eq("client_id", user!.id)
    .order("week_added", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Archiv</h1>
        <p className="mt-1.5 text-sm text-gray-500">
          Alle {leads?.length ?? 0} Leads auf einen Blick
        </p>
      </div>

      {leads && leads.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[40px_1fr_140px_160px_130px_100px] gap-4 px-5 py-3 border-b border-gray-100 bg-gray-50 text-xs font-medium uppercase tracking-wider text-gray-400">
            <div />
            <div>Unternehmen</div>
            <div>Branche</div>
            <div>Kontakt</div>
            <div>Status</div>
            <div>Woche</div>
          </div>

          {/* Rows */}
          {leads.map((lead, i) => (
            <div
              key={lead.id}
              className="grid grid-cols-[40px_1fr_140px_160px_130px_100px] gap-4 px-5 py-4 items-center border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
            >
              {/* Logo */}
              <div>
                {lead.logo_url ? (
                  <img
                    src={lead.logo_url}
                    alt=""
                    className="w-8 h-8 rounded-md object-contain border border-gray-100"
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                    style={{ background: "hsl(210, 100%, 55%, 0.1)", color: "hsl(210, 100%, 50%)" }}
                  >
                    {lead.company_name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Firma */}
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{lead.company_name}</p>
                {lead.website && (
                  <a
                    href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1 hover:underline mt-0.5"
                    style={{ color: "hsl(210, 100%, 50%)" }}
                  >
                    {lead.website.replace(/^https?:\/\//, "").split("/")[0]}
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>

              {/* Branche */}
              <div className="text-xs text-gray-400 truncate">{lead.industry ?? "—"}</div>

              {/* Kontakt */}
              <div className="min-w-0">
                {lead.contact_name ? (
                  <>
                    <p className="text-sm text-gray-700 truncate">{lead.contact_name}</p>
                    {lead.contact_position && (
                      <p className="text-xs text-gray-400 truncate">{lead.contact_position}</p>
                    )}
                  </>
                ) : (
                  <span className="text-xs text-gray-300">—</span>
                )}
              </div>

              {/* Status */}
              <div>
                <LeadStatusDropdown leadId={lead.id} initialStatus={lead.status} />
              </div>

              {/* Woche */}
              <div className="text-xs text-gray-400">
                {lead.week_added ? formatDate(lead.week_added) : "—"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: "hsl(210, 100%, 55%, 0.08)" }}
          >
            📁
          </div>
          <div>
            <p className="text-base font-semibold text-gray-800 mb-1">Noch keine Leads im Archiv</p>
            <p className="text-sm text-gray-400">Alle gelieferten Leads erscheinen hier in der Übersicht.</p>
          </div>
        </div>
      )}
    </div>
  );
}
