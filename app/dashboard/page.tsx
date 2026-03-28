import { createClient } from "@/lib/supabase/server";
import LeadCard from "@/components/LeadCard";

function formatWeekLabel(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("de-CH", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .eq("client_id", user!.id)
    .order("week_added", { ascending: false });

  // Leads nach Woche gruppieren
  const grouped: Record<string, typeof leads> = {};
  for (const lead of leads ?? []) {
    const key = lead.week_added ?? "unbekannt";
    if (!grouped[key]) grouped[key] = [];
    grouped[key]!.push(lead);
  }

  const weeks = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const thisWeek = weeks[0];
  const thisWeekCount = thisWeek ? grouped[thisWeek]!.length : 0;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" style={{ color: "hsl(210, 40%, 98%)" }}>
          Ihre Leads
        </h1>
        <p className="mt-2 text-sm" style={{ color: "hsl(215, 20%, 65%)" }}>
          {!leads || leads.length === 0
            ? "Noch keine Leads vorhanden."
            : `${thisWeekCount} neue${thisWeekCount !== 1 ? "" : "r"} Lead${thisWeekCount !== 1 ? "s" : ""} diese Woche · ${leads.length} insgesamt`}
        </p>
      </div>

      {/* Gruppiert nach Woche */}
      {weeks.map((week, index) => (
        <section key={week}>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-semibold" style={{ color: "hsl(210, 40%, 98%)" }}>
              {week === "unbekannt" ? "Weitere Leads" : `Woche vom ${formatWeekLabel(week)}`}
            </h2>
            {index === 0 && (
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: "hsl(210, 100%, 65%, 0.15)", color: "hsl(210, 100%, 65%)" }}
              >
                {grouped[week]!.length} neu
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {grouped[week]!.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </section>
      ))}

      {/* Leer */}
      {(!leads || leads.length === 0) && (
        <div
          className="rounded-xl border p-16 text-center"
          style={{ borderColor: "hsl(220, 30%, 20%)", background: "hsl(220, 30%, 11%)" }}
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
