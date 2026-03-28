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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "hsl(210, 40%, 98%)" }}>
          Archiv
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: "hsl(215, 20%, 55%)" }}>
          Alle {leads?.length ?? 0} Leads auf einen Blick
        </p>
      </div>

      {/* Tabelle */}
      {leads && leads.length > 0 ? (
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "hsl(220, 30%, 20%)" }}
        >
          {/* Table Header */}
          <div
            className="grid grid-cols-[40px_1fr_140px_160px_120px_100px] gap-4 px-5 py-3 text-xs font-medium uppercase tracking-wider border-b"
            style={{
              background: "hsl(220, 30%, 13%)",
              borderColor: "hsl(220, 30%, 20%)",
              color: "hsl(215, 20%, 45%)",
            }}
          >
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
              className="grid grid-cols-[40px_1fr_140px_160px_120px_100px] gap-4 px-5 py-4 items-center border-b transition-colors"
              style={{
                borderColor: "hsl(220, 30%, 18%)",
                background: i % 2 === 0 ? "hsl(220, 30%, 11%)" : "hsl(220, 30%, 12%)",
              }}
            >
              {/* Logo */}
              <div>
                {lead.logo_url ? (
                  <img
                    src={lead.logo_url}
                    alt=""
                    className="w-8 h-8 rounded-md object-contain"
                    style={{ background: "hsl(220, 30%, 16%)" }}
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                    style={{ background: "hsl(210, 100%, 65%, 0.15)", color: "hsl(210, 100%, 65%)" }}
                  >
                    {lead.company_name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Firma */}
              <div className="min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: "hsl(210, 40%, 95%)" }}>
                  {lead.company_name}
                </p>
                {lead.website && (
                  <a
                    href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1 hover:underline mt-0.5"
                    style={{ color: "hsl(210, 100%, 65%)" }}
                  >
                    {lead.website.replace(/^https?:\/\//, "").split("/")[0]}
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>

              {/* Branche */}
              <div className="text-xs truncate" style={{ color: "hsl(215, 20%, 55%)" }}>
                {lead.industry ?? "—"}
              </div>

              {/* Kontakt */}
              <div className="min-w-0">
                {lead.contact_name ? (
                  <>
                    <p className="text-sm truncate" style={{ color: "hsl(210, 40%, 88%)" }}>
                      {lead.contact_name}
                    </p>
                    {lead.contact_position && (
                      <p className="text-xs truncate" style={{ color: "hsl(215, 20%, 50%)" }}>
                        {lead.contact_position}
                      </p>
                    )}
                  </>
                ) : (
                  <span className="text-xs" style={{ color: "hsl(215, 20%, 40%)" }}>—</span>
                )}
              </div>

              {/* Status */}
              <div>
                <LeadStatusDropdown leadId={lead.id} initialStatus={lead.status} />
              </div>

              {/* Woche */}
              <div className="text-xs" style={{ color: "hsl(215, 20%, 50%)" }}>
                {lead.week_added ? formatDate(lead.week_added) : "—"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl border p-16 text-center flex flex-col items-center gap-4"
          style={{ borderColor: "hsl(220, 30%, 20%)", background: "hsl(220, 30%, 10%)" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: "hsl(210, 100%, 65%, 0.1)" }}
          >
            📁
          </div>
          <div>
            <p className="text-base font-semibold mb-1" style={{ color: "hsl(210, 40%, 98%)" }}>
              Noch keine Leads im Archiv
            </p>
            <p className="text-sm" style={{ color: "hsl(215, 20%, 55%)" }}>
              Alle gelieferten Leads erscheinen hier in der Übersicht.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
