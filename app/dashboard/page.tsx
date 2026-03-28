export const unstable_instant = { prefetch: "static" };

import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import LeadCard from "@/components/LeadCard";

function formatWeekLabel(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-CH", { day: "2-digit", month: "long", year: "numeric" });
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<LeadsSkeleton />}>
      <LeadsContent />
    </Suspense>
  );
}

async function LeadsContent() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: leads } = await supabase
    .from("leads").select("*").eq("client_id", user!.id).order("week_added", { ascending: false });

  const grouped: Record<string, typeof leads> = {};
  for (const lead of leads ?? []) {
    const key = lead.week_added ?? "unbekannt";
    if (!grouped[key]) grouped[key] = [];
    grouped[key]!.push(lead);
  }

  const weeks = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const newLeadsCount = weeks[0] ? grouped[weeks[0]]!.length : 0;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "hsl(210, 40%, 98%)" }}>Ihre Leads</h1>
        <p className="mt-1.5 text-sm" style={{ color: "hsl(215, 20%, 65%)" }}>
          {!leads || leads.length === 0
            ? "Noch keine Leads vorhanden."
            : `${newLeadsCount} neue${newLeadsCount !== 1 ? "" : "r"} Lead${newLeadsCount !== 1 ? "s" : ""} diese Woche · ${leads.length} insgesamt`}
        </p>
      </div>

      {weeks.map((week, index) => (
        <section key={week}>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-base font-semibold" style={{ color: "hsl(210, 40%, 98%)" }}>
              {week === "unbekannt" ? "Weitere Leads" : `Woche vom ${formatWeekLabel(week)}`}
            </h2>
            {index === 0 && (
              <span className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: "hsl(210, 100%, 65%, 0.12)", color: "hsl(210, 100%, 65%)" }}>
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
          style={{ borderColor: "hsl(220, 30%, 20%)", backgroundColor: "hsl(222, 50%, 7%)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: "hsl(210, 100%, 65%, 0.1)" }}>🎯</div>
          <div>
            <p className="text-base font-semibold mb-1" style={{ color: "hsl(210, 40%, 98%)" }}>
              Ihre ersten Leads sind unterwegs
            </p>
            <p className="text-sm" style={{ color: "hsl(215, 20%, 65%)" }}>
              CrossMatic liefert wöchentlich tiefgehend recherchierte Kontakte direkt hier.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function LeadsSkeleton() {
  return (
    <div className="space-y-10">
      <div>
        <div className="h-8 w-40 rounded-lg animate-pulse bg-white/10 mb-2" />
        <div className="h-4 w-64 rounded-lg animate-pulse bg-white/5" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/10 h-64 animate-pulse"
            style={{ backgroundColor: "#0d1118" }} />
        ))}
      </div>
    </div>
  );
}
