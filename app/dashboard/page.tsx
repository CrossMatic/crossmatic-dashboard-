import { createClient } from "@/lib/supabase/server";
import LeadCard from "@/components/LeadCard";
import { Sparkles } from "lucide-react";

function formatWeekLabel(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-CH", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: leads } = await supabase
    .from("leads").select("*")
    .eq("client_id", user!.id)
    .order("week_added", { ascending: false });

  const grouped: Record<string, typeof leads> = {};
  for (const lead of leads ?? []) {
    const key = lead.week_added ?? "unbekannt";
    if (!grouped[key]) grouped[key] = [];
    grouped[key]!.push(lead);
  }

  const weeks = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const newLeadsCount = weeks[0] ? grouped[weeks[0]]!.length : 0;
  const allUncontacted = leads?.filter((l) => !l.status || l.status === "neu") ?? [];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-white">Ihre Leads</h1>
        <p className="mt-1.5 text-sm" style={{ color: "#52525b" }}>
          {!leads || leads.length === 0
            ? "Noch keine Leads vorhanden."
            : `${newLeadsCount} neue${newLeadsCount !== 1 ? "" : "r"} Lead${newLeadsCount !== 1 ? "s" : ""} diese Woche · ${leads.length} insgesamt`}
        </p>
      </div>

      {allUncontacted.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm"
          style={{ background: "rgba(59,130,246,0.06)", borderColor: "rgba(59,130,246,0.15)", color: "hsl(210,100%,65%)" }}>
          <Sparkles size={16} className="shrink-0" />
          <span>
            {allUncontacted.length === 1
              ? "1 Lead wartet auf Ihre Kontaktaufnahme."
              : `${allUncontacted.length} Leads warten auf Ihre Kontaktaufnahme.`}
          </span>
        </div>
      )}

      {weeks.map((week, index) => (
        <section key={week}>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-base font-semibold" style={{ color: "#a1a1aa" }}>
              {week === "unbekannt" ? "Weitere Leads" : `Woche vom ${formatWeekLabel(week)}`}
            </h2>
            {index === 0 && (
              <span className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                style={{ background: "rgba(59,130,246,0.12)", color: "hsl(210,100%,65%)" }}>
                {grouped[week]!.length} neu
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {grouped[week]!.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </section>
      ))}

      {(!leads || leads.length === 0) && (
        <div className="rounded-2xl border p-16 text-center flex flex-col items-center gap-4"
          style={{ borderColor: "#2a2a2a", background: "#111111" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: "rgba(255,255,255,0.04)" }}>🎯</div>
          <div>
            <p className="text-base font-semibold text-white mb-1">Ihre ersten Leads sind unterwegs</p>
            <p className="text-sm" style={{ color: "#52525b" }}>
              CrossMatic liefert wöchentlich tiefgehend recherchierte Kontakte direkt hier.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
