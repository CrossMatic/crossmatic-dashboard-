import { createClient } from "@/lib/supabase/server";
import LeadCard from "@/components/LeadCard";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .eq("client_id", user!.id)
    .order("created_at", { ascending: false });

  const currentWeekLeads = leads?.filter((lead) => {
    if (!lead.week_added) return true;
    const weekDate = new Date(lead.week_added);
    const now = new Date();
    const diffDays = (now.getTime() - weekDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  });

  const olderLeads = leads?.filter((lead) => {
    if (!lead.week_added) return false;
    const weekDate = new Date(lead.week_added);
    const now = new Date();
    const diffDays = (now.getTime() - weekDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays > 7;
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" style={{ color: "hsl(210, 40%, 98%)" }}>
          Ihre Leads
        </h1>
        <p className="mt-2 text-sm" style={{ color: "hsl(215, 20%, 65%)" }}>
          {leads?.length === 0
            ? "Noch keine Leads vorhanden."
            : `${leads?.length} Lead${leads!.length !== 1 ? "s" : ""} insgesamt`}
        </p>
      </div>

      {/* Aktuelle Woche */}
      {currentWeekLeads && currentWeekLeads.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-semibold" style={{ color: "hsl(210, 40%, 98%)" }}>
              Diese Woche
            </h2>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                background: "hsl(210, 100%, 65%, 0.15)",
                color: "hsl(210, 100%, 65%)",
              }}
            >
              {currentWeekLeads.length} neu
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentWeekLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </section>
      )}

      {/* Ältere Leads */}
      {olderLeads && olderLeads.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-6" style={{ color: "hsl(215, 20%, 65%)" }}>
            Frühere Leads
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {olderLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </section>
      )}

      {/* Leer */}
      {(!leads || leads.length === 0) && (
        <div
          className="rounded-xl border p-16 text-center"
          style={{
            borderColor: "hsl(220, 30%, 20%)",
            background: "hsl(220, 30%, 11%)",
          }}
        >
          <p className="text-lg font-medium mb-2" style={{ color: "hsl(210, 40%, 98%)" }}>
            Noch keine Leads
          </p>
          <p className="text-sm" style={{ color: "hsl(215, 20%, 65%)" }}>
            Ihre Leads erscheinen hier sobald CrossMatic diese wöchentlich liefert.
          </p>
        </div>
      )}
    </div>
  );
}
