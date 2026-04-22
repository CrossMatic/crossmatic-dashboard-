"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  konfidenz_score: number | null;
  status: string | null;
  week_added: string | null;
}

function parseSolutions(text: string): { title: string; body: string }[] {
  const parts = text.split(/\.\s+(?=[A-ZÄÖÜC])/);
  return parts.map(part => {
    const colonIdx = part.indexOf(': ');
    if (colonIdx > 0 && colonIdx < 40) {
      return { title: part.slice(0, colonIdx), body: part.slice(colonIdx + 2).replace(/\.$/, '').trim() };
    }
    return { title: '', body: part.replace(/\.$/, '').trim() };
  }).filter(p => p.body);
}

const FG     = "hsl(210, 40%, 98%)";   // near-white — all main text
const MUTED  = "hsl(215, 20%, 65%)";   // supporting text
const DIM    = "hsl(215, 20%, 45%)";   // labels / de-emphasized
const ACCENT = "hsl(210, 100%, 65%)";

export default function LeadCard({ lead }: { lead: Lead }) {
  const [analyseOpen, setAnalyseOpen] = useState(false);
  const hasAnalyse = lead.fit_description || lead.pain_point || lead.intent_signal;

  return (
    <div
      className="surface-glow-hover rounded-2xl border border-white/10 bg-white/5 flex flex-col overflow-hidden"
      style={{ backgroundColor: "#0d1118" }}
    >
      {/* Header */}
      <div className="p-6 pb-4">
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
          <div className="flex items-center gap-2 shrink-0">
            {lead.konfidenz_score !== null && lead.konfidenz_score !== undefined && (
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
            )}
            <LeadStatusDropdown leadId={lead.id} initialStatus={lead.status} />
          </div>
        </div>


        {lead.description && (
          <p className="text-sm leading-relaxed mt-3" style={{ color: FG }}>
            {lead.description}
          </p>
        )}
      </div>

      <div className="h-px mx-6 bg-white/10" />

      {/* Kontaktperson */}
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
              className="text-sm hover:underline" style={{ color: ACCENT }}
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
          <div className="flex items-center gap-2.5 mt-1">
            <span className="text-sm">💬</span>
            <span className="text-xs px-2 py-0.5 rounded-md"
              style={{ backgroundColor: "hsl(210, 100%, 65%, 0.1)", color: ACCENT }}>
              Empfohlen: {lead.preferred_contact_channel}
            </span>
          </div>
        )}
      </div>

      {/* Analyse Accordion */}
      {hasAnalyse && (
        <>
          <div className="h-px mx-6 bg-white/10" />
          <button
            onClick={() => setAnalyseOpen((v) => !v)}
            className="flex items-center justify-between px-6 py-3.5 text-sm font-medium w-full text-left cursor-pointer transition-colors hover:bg-white/5"
            style={{ color: MUTED }}
          >
            <span>Analyse anzeigen</span>
            {analyseOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {analyseOpen && (
            <div className="px-6 pb-6 space-y-4">
              {lead.intent_signal && (
                <div className="rounded-lg p-3.5"
                  style={{ backgroundColor: "rgba(234,179,8,0.07)", border: "1px solid rgba(234,179,8,0.2)" }}>
                  <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "#f59e0b" }}>
                    ⚡ Strategischer Trigger
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: FG }}>{lead.intent_signal}</p>
                </div>
              )}
              {lead.pain_point && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: ACCENT }}>
                    Pain Point
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: FG }}>{lead.pain_point}</p>
                </div>
              )}
              {lead.fit_description && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: ACCENT }}>
                    Mögliche Lösungen
                  </p>
                  <ul className="space-y-3">
                    {parseSolutions(lead.fit_description).map((item, i) => (
                      <li key={i} className="flex flex-col gap-0.5">
                        {item.title && (
                          <span className="text-sm font-semibold" style={{ color: FG }}>{item.title}</span>
                        )}
                        <span className="text-sm leading-relaxed" style={{ color: FG }}>{item.body}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
