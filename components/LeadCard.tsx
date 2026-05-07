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
      className="surface-glow-hover rounded-2xl border border-white/10 flex flex-col"
      style={{ backgroundColor: "#0d1118" }}
    >
      {/* Header: Name + Status oben rechts */}
      <div className="flex items-start gap-3 p-6 pb-4">
        <Link href={`/dashboard/leads/${lead.id}`} className="flex items-center min-w-0 flex-1">
          <div className="min-w-0">
            <h2 className="text-base font-semibold leading-tight truncate" style={{ color: FG }}>
              {lead.company_name}
            </h2>
            {lead.industry && (
              <span className="text-xs" style={{ color: MUTED }}>{lead.industry}</span>
            )}
          </div>
        </Link>
        <div className="shrink-0 pt-0.5">
          <LeadStatusDropdown leadId={lead.id} initialStatus={lead.status} />
        </div>
      </div>

      {/* Beschreibung */}
      {lead.description && (
        <Link href={`/dashboard/leads/${lead.id}`} className="block px-6 pb-4 hover:opacity-80 transition-opacity">
          <p className="text-sm leading-relaxed line-clamp-3" style={{ color: MUTED }}>
            {lead.description}
          </p>
        </Link>
      )}

      <div className="h-px mx-6 bg-white/10" />

      {/* Alle Kontaktinfos */}
      <div className="p-6 py-4 space-y-2.5">
        <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: DIM }}>
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
        {lead.contact_email && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">✉️</span>
            <a href={`mailto:${lead.contact_email}`} className="text-sm hover:underline" style={{ color: FG }}>
              {lead.contact_email}
            </a>
          </div>
        )}
        {lead.phone && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">📞</span>
            <a href={`tel:${lead.phone}`} className="text-sm hover:underline" style={{ color: FG }}>
              {lead.phone}
            </a>
          </div>
        )}
        {lead.website && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">🌐</span>
            <a
              href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
              target="_blank" rel="noopener noreferrer"
              className="text-sm hover:underline truncate" style={{ color: ACCENT }}
            >
              {lead.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
        {lead.location && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">📍</span>
            <span className="text-sm" style={{ color: FG }}>{lead.location}</span>
          </div>
        )}
        {lead.linkedin_url && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">🔗</span>
            <a href={lead.linkedin_url} target="_blank" rel="noopener noreferrer"
              className="text-sm hover:underline" style={{ color: ACCENT }}>
              LinkedIn-Profil
            </a>
          </div>
        )}
        {lead.preferred_contact_channel && (
          <div className="flex items-center gap-2.5 pt-0.5">
            <span className="text-sm">💬</span>
            <span className="text-xs px-2 py-0.5 rounded-md"
              style={{ backgroundColor: "hsl(210, 100%, 65%, 0.1)", color: ACCENT }}>
              {lead.preferred_contact_channel}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto h-px mx-6 bg-white/10" />
      <div className="px-6 py-3.5 flex items-center justify-between">
        {lead.konfidenz_score !== null && lead.konfidenz_score !== undefined ? (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
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
        ) : <span />}
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
