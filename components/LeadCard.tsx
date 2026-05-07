"use client";

import Link from "next/link";
import LeadStatusDropdown from "./LeadStatusDropdown";

interface Lead {
  id: string;
  company_name: string;
  logo_url: string | null;
  website: string | null;
  industry: string | null;
  location: string | null;
  description: string | null;
  contact_name: string | null;
  contact_position: string | null;
  contact_email: string | null;
  phone: string | null;
  linkedin_url: string | null;
  preferred_contact_channel: string | null;
  fit_description: string | null;
  pain_point: string | null;
  intent_signal: string | null;
  opportunity: string | null;
  strategic_hook: string | null;
  konfidenz_score: number | null;
  status: string | null;
  week_added: string | null;
}

const FG     = "hsl(210, 40%, 98%)";
const MUTED  = "hsl(215, 20%, 65%)";
const DIM    = "hsl(215, 20%, 45%)";
const ACCENT = "hsl(210, 100%, 65%)";

export default function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div
      className="surface-glow-hover rounded-2xl border border-white/10 flex flex-col overflow-hidden"
      style={{ backgroundColor: "#0d1118" }}
    >
      {/* Header — klickbar zur Detail-Seite */}
      <Link href={`/dashboard/leads/${lead.id}`} className="block p-6 pb-4 hover:opacity-90 transition-opacity">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {lead.logo_url ? (
              <img
                src={lead.logo_url}
                alt={`${lead.company_name} Logo`}
                className="w-10 h-10 rounded-lg object-contain shrink-0"
                style={{ backgroundColor: "hsl(220, 30%, 20%)" }}
              />
            ) : (
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold"
                style={{ backgroundColor: "hsl(210, 100%, 65%, 0.12)", color: ACCENT }}
              >
                {lead.company_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-base font-semibold leading-tight truncate" style={{ color: FG }}>
                {lead.company_name}
              </h2>
              {lead.industry && (
                <span className="text-xs" style={{ color: MUTED }}>{lead.industry}</span>
              )}
            </div>
          </div>
          {lead.konfidenz_score !== null && lead.konfidenz_score !== undefined && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0"
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
              ⭐ {lead.konfidenz_score}/10
            </div>
          )}
        </div>

        {lead.description && (
          <p className="text-sm leading-relaxed mt-3 line-clamp-3" style={{ color: MUTED }}>
            {lead.description}
          </p>
        )}
      </Link>

      <div className="h-px mx-6 bg-white/10" />

      {/* Kontaktperson */}
      <div className="p-6 py-4 space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider mb-2.5" style={{ color: DIM }}>
          Entscheiderperson
        </p>
        {lead.contact_name && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">👤</span>
            <span className="text-sm font-medium" style={{ color: FG }}>{lead.contact_name}</span>
            {lead.contact_position && (
              <span className="text-xs" style={{ color: MUTED }}>· {lead.contact_position}</span>
            )}
          </div>
        )}
        {lead.location && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">📍</span>
            <span className="text-sm" style={{ color: FG }}>{lead.location}</span>
          </div>
        )}
      </div>

      {/* Footer — Status + "Details" Link */}
      <div className="mt-auto h-px mx-6 bg-white/10" />
      <div className="px-6 py-3.5 flex items-center justify-between">
        <LeadStatusDropdown leadId={lead.id} initialStatus={lead.status} />
        <Link
          href={`/dashboard/leads/${lead.id}`}
          className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors hover:bg-white/5"
          style={{ color: ACCENT }}
        >
          Details ansehen →
        </Link>
      </div>
    </div>
  );
}
