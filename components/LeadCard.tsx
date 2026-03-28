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
  status: string | null;
  week_added: string | null;
}

// Colors from nebula-flow
const C = {
  text: "hsl(210, 40%, 98%)",       // primary text — near white
  textMuted: "hsl(215, 20%, 65%)",  // body text — readable light gray
  textDim: "hsl(215, 20%, 45%)",    // labels, de-emphasized
  border: "hsl(220, 30%, 20%)",
  cardBg: "hsl(222, 50%, 9%)",
  accent: "hsl(210, 100%, 65%)",
};

export default function LeadCard({ lead }: { lead: Lead }) {
  const [analyseOpen, setAnalyseOpen] = useState(false);
  const hasAnalyse = lead.fit_description || lead.pain_point || lead.intent_signal;

  return (
    <div
      className="rounded-xl border flex flex-col overflow-hidden transition-all duration-300"
      style={{ background: C.cardBg, borderColor: C.border }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(148,163,184,0.32)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 24px rgba(59,130,246,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {lead.logo_url ? (
              <img src={lead.logo_url} alt={`${lead.company_name} Logo`}
                className="w-10 h-10 rounded-lg object-contain shrink-0"
                style={{ background: "hsl(220, 30%, 14%)" }} />
            ) : (
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold"
                style={{ background: "hsl(210, 100%, 65%, 0.1)", color: C.accent }}>
                {lead.company_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-base font-semibold leading-tight truncate" style={{ color: C.text }}>
                {lead.company_name}
              </h2>
              {lead.industry && (
                <span className="text-xs" style={{ color: C.textDim }}>{lead.industry}</span>
              )}
            </div>
          </div>
          <LeadStatusDropdown leadId={lead.id} initialStatus={lead.status} />
        </div>

        <div className="flex items-center gap-4 mt-3 flex-wrap">
          {lead.website && (
            <a href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
              target="_blank" rel="noopener noreferrer"
              className="text-xs hover:underline" style={{ color: C.accent }}>
              🌐 {lead.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          {lead.location && (
            <span className="text-xs" style={{ color: C.textDim }}>📍 {lead.location}</span>
          )}
        </div>

        {lead.description && (
          <p className="text-sm leading-relaxed mt-3" style={{ color: C.textMuted }}>
            {lead.description}
          </p>
        )}
      </div>

      <div className="h-px mx-6" style={{ background: C.border }} />

      {/* Kontaktperson */}
      <div className="p-6 py-4 space-y-2.5">
        <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: C.textDim }}>
          Entscheiderperson
        </p>
        {lead.contact_name && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">👤</span>
            <span className="text-sm font-medium" style={{ color: C.text }}>{lead.contact_name}</span>
            {lead.contact_position && (
              <span className="text-xs" style={{ color: C.textDim }}>· {lead.contact_position}</span>
            )}
          </div>
        )}
        {lead.contact_email && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">✉️</span>
            <a href={`mailto:${lead.contact_email}`} className="text-sm hover:underline" style={{ color: C.textMuted }}>
              {lead.contact_email}
            </a>
          </div>
        )}
        {lead.phone && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">📞</span>
            <a href={`tel:${lead.phone}`} className="text-sm hover:underline" style={{ color: C.textMuted }}>
              {lead.phone}
            </a>
          </div>
        )}
        {lead.linkedin_url && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">🔗</span>
            <a href={lead.linkedin_url} target="_blank" rel="noopener noreferrer"
              className="text-sm hover:underline" style={{ color: C.accent }}>
              LinkedIn-Profil
            </a>
          </div>
        )}
        {lead.preferred_contact_channel && (
          <div className="flex items-center gap-2.5 mt-1">
            <span className="text-sm">💬</span>
            <span className="text-xs px-2 py-0.5 rounded-md"
              style={{ background: "hsl(210, 100%, 65%, 0.08)", color: C.accent }}>
              Empfohlen: {lead.preferred_contact_channel}
            </span>
          </div>
        )}
      </div>

      {/* Analyse Accordion */}
      {hasAnalyse && (
        <>
          <div className="h-px mx-6" style={{ background: C.border }} />
          <button onClick={() => setAnalyseOpen((v) => !v)}
            className="flex items-center justify-between px-6 py-3.5 text-sm font-medium transition-colors cursor-pointer w-full text-left hover:bg-white/[0.02]"
            style={{ color: C.textDim }}>
            <span>Analyse anzeigen</span>
            {analyseOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {analyseOpen && (
            <div className="px-6 pb-6 space-y-4">
              {lead.fit_description && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: C.accent }}>
                    Agentur-Fit
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{lead.fit_description}</p>
                </div>
              )}
              {lead.pain_point && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: C.accent }}>
                    Pain Point
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{lead.pain_point}</p>
                </div>
              )}
              {lead.intent_signal && (
                <div className="rounded-lg p-3.5"
                  style={{ background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.18)" }}>
                  <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "#f59e0b" }}>
                    ⚡ Intent-Signal
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(215, 20%, 65%)" }}>{lead.intent_signal}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
