import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const FG     = "hsl(210, 40%, 98%)";
const MUTED  = "hsl(215, 20%, 65%)";
const DIM    = "hsl(215, 20%, 45%)";
const ACCENT = "hsl(210, 100%, 65%)";

function parseSolutions(text: string): { title: string; body: string }[] {
  const parts = text.split(/\.\s+(?=[A-ZÄÖÜC])/);
  return parts.map(part => {
    const colonIdx = part.indexOf(": ");
    if (colonIdx > 0 && colonIdx < 40) {
      return { title: part.slice(0, colonIdx), body: part.slice(colonIdx + 2).replace(/\.$/, "").trim() };
    }
    return { title: "", body: part.replace(/\.$/, "").trim() };
  }).filter(p => p.body);
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: lead } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .eq("client_id", user.id)
    .single();

  if (!lead) notFound();

  return (
    <div className="max-w-2xl mx-auto space-y-8">

      {/* Zurück-Link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80"
        style={{ color: MUTED }}
      >
        <ArrowLeft size={15} />
        Zurück zur Übersicht
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#0d1118" }}>
        <div className="flex items-start gap-4">
          {lead.logo_url ? (
            <img
              src={lead.logo_url}
              alt={`${lead.company_name} Logo`}
              className="w-14 h-14 rounded-xl object-contain shrink-0"
              style={{ backgroundColor: "hsl(220, 30%, 20%)" }}
            />
          ) : (
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 text-xl font-bold"
              style={{ backgroundColor: "hsl(210, 100%, 65%, 0.12)", color: ACCENT }}
            >
              {lead.company_name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h1 className="text-xl font-bold" style={{ color: FG }}>{lead.company_name}</h1>
                {lead.industry && (
                  <p className="text-sm mt-0.5" style={{ color: MUTED }}>{lead.industry}</p>
                )}
              </div>
              {lead.konfidenz_score !== null && lead.konfidenz_score !== undefined && (
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: lead.konfidenz_score >= 8
                      ? "rgba(34,197,94,0.12)"
                      : lead.konfidenz_score >= 5
                      ? "rgba(234,179,8,0.12)"
                      : "rgba(239,68,68,0.12)",
                    color: lead.konfidenz_score >= 8
                      ? "#22c55e"
                      : lead.konfidenz_score >= 5
                      ? "#eab308"
                      : "#ef4444",
                    border: `1px solid ${lead.konfidenz_score >= 8
                      ? "rgba(34,197,94,0.25)"
                      : lead.konfidenz_score >= 5
                      ? "rgba(234,179,8,0.25)"
                      : "rgba(239,68,68,0.25)"}`,
                  }}>
                  ⭐ {lead.konfidenz_score}/10 Konfidenz
                </div>
              )}
            </div>
            {lead.description && (
              <p className="text-sm leading-relaxed mt-3" style={{ color: FG }}>
                {lead.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Kontakt */}
      <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#0d1118" }}>
        <p className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: DIM }}>
          Entscheiderperson & Kontakt
        </p>
        <div className="space-y-3">
          {lead.contact_name && (
            <div className="flex items-center gap-3">
              <span className="text-base">👤</span>
              <span className="text-sm font-medium" style={{ color: FG }}>{lead.contact_name}</span>
              {lead.contact_position && (
                <span className="text-xs" style={{ color: MUTED }}>· {lead.contact_position}</span>
              )}
            </div>
          )}
          {lead.contact_email && (
            <div className="flex items-center gap-3">
              <span className="text-base">✉️</span>
              <a href={`mailto:${lead.contact_email}`} className="text-sm hover:underline" style={{ color: FG }}>
                {lead.contact_email}
              </a>
            </div>
          )}
          {lead.phone && (
            <div className="flex items-center gap-3">
              <span className="text-base">📞</span>
              <a href={`tel:${lead.phone}`} className="text-sm hover:underline" style={{ color: FG }}>
                {lead.phone}
              </a>
            </div>
          )}
          {lead.website && (
            <div className="flex items-center gap-3">
              <span className="text-base">🌐</span>
              <a
                href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                target="_blank" rel="noopener noreferrer"
                className="text-sm hover:underline" style={{ color: ACCENT }}
              >
                {lead.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
          {lead.location && (
            <div className="flex items-center gap-3">
              <span className="text-base">📍</span>
              <span className="text-sm" style={{ color: FG }}>{lead.location}</span>
            </div>
          )}
          {lead.linkedin_url && (
            <div className="flex items-center gap-3">
              <span className="text-base">🔗</span>
              <a href={lead.linkedin_url} target="_blank" rel="noopener noreferrer"
                className="text-sm hover:underline" style={{ color: ACCENT }}>
                LinkedIn-Profil
              </a>
            </div>
          )}
          {lead.preferred_contact_channel && (
            <div className="flex items-center gap-3 pt-1">
              <span className="text-base">💬</span>
              <span className="text-xs px-2.5 py-1 rounded-md"
                style={{ backgroundColor: "hsl(210, 100%, 65%, 0.1)", color: ACCENT }}>
                Empfohlener Kanal: {lead.preferred_contact_channel}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Analyse */}
      {(lead.intent_signal || lead.pain_point || lead.opportunity || lead.fit_description || lead.strategic_hook) && (
        <div className="rounded-2xl border border-white/10 p-6 space-y-6" style={{ backgroundColor: "#0d1118" }}>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: DIM }}>
            Analyse
          </p>

          {lead.intent_signal && (
            <div className="rounded-lg p-4"
              style={{ backgroundColor: "rgba(234,179,8,0.07)", border: "1px solid rgba(234,179,8,0.2)" }}>
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "#f59e0b" }}>
                ⚡ Strategischer Trigger
              </p>
              <p className="text-sm leading-relaxed" style={{ color: FG }}>{lead.intent_signal}</p>
            </div>
          )}

          {lead.pain_point && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: ACCENT }}>
                Pain Point
              </p>
              <p className="text-sm leading-relaxed" style={{ color: FG }}>{lead.pain_point}</p>
            </div>
          )}

          {lead.opportunity && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: ACCENT }}>
                Möglichkeit
              </p>
              <p className="text-sm leading-relaxed" style={{ color: FG }}>{lead.opportunity}</p>
            </div>
          )}

          {lead.fit_description && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: ACCENT }}>
                Mögliche Lösungen
              </p>
              <ul className="space-y-3">
                {parseSolutions(lead.fit_description).map((item, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    {item.title && (
                      <span className="text-sm font-semibold" style={{ color: FG }}>{item.title}</span>
                    )}
                    <span className="text-sm leading-relaxed" style={{ color: FG }}>{item.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lead.strategic_hook && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: ACCENT }}>
                Strategischer Aufhänger
              </p>
              <p className="text-sm leading-relaxed" style={{ color: FG }}>{lead.strategic_hook}</p>
            </div>
          )}
        </div>
      )}

      {/* Email-Copy */}
      {lead.email_copy && (
        <div className="rounded-2xl border border-white/10 p-6 space-y-4" style={{ backgroundColor: "#0d1118" }}>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: DIM }}>
            Email-Entwurf
          </p>
          <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans" style={{ color: FG }}>
            {lead.email_copy}
          </pre>
        </div>
      )}

    </div>
  );
}
