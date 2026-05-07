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

  const { data: allLeads } = await supabase
    .from("leads").select("*").eq("client_id", user!.id).order("week_added", { ascending: false });

  const latestWeek = allLeads?.[0]?.week_added ?? null;
  const leads = latestWeek
    ? (allLeads?.filter((l) => l.week_added === latestWeek) ?? [])
    : (allLeads ?? []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "hsl(210, 40%, 98%)" }}>Ihre Leads</h1>
        <p className="mt-1.5 text-sm" style={{ color: "hsl(215, 20%, 65%)" }}>
          {!leads || leads.length === 0
            ? "Noch keine Leads vorhanden."
            : `${leads.length} neue${leads.length !== 1 ? "" : "r"} Lead${leads.length !== 1 ? "s" : ""} diese Woche${latestWeek ? ` · ${formatWeekLabel(latestWeek)}` : ""}`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>

      {(!leads || leads.length === 0) && (
        <div className="rounded-2xl border p-16 text-center flex flex-col items-center gap-4"
          style={{ borderColor: "hsl(220, 30%, 20%)", backgroundColor: "#02040a" }}>
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
    <div className="space-y-8">
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
