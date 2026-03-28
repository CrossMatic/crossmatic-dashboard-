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

export default function LeadCard({ lead }: { lead: Lead }) {
  const [analyseOpen, setAnalyseOpen] = useState(false);
  const hasAnalyse = lead.fit_description || lead.pain_point || lead.intent_signal;

  return (
    <div className="rounded-xl border flex flex-col overflow-hidden transition-all duration-200"
      style={{ background: "#1a1a1a", borderColor: "#2a2a2a" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#3f3f46";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a";
      }}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {lead.logo_url ? (
              <img src={lead.logo_url} alt={`${lead.company_name} Logo`}
                className="w-10 h-10 rounded-lg object-contain shrink-0"
                style={{ background: "#262626" }} />
            ) : (
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold"
                style={{ background: "rgba(255,255,255,0.06)", color: "#a1a1aa" }}>
                {lead.company_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-base font-semibold leading-tight text-white truncate">
                {lead.company_name}
              </h2>
              {lead.industry && (
                <span className="text-xs" style={{ color: "#52525b" }}>{lead.industry}</span>
              )}
            </div>
          </div>
          <LeadStatusDropdown leadId={lead.id} initialStatus={lead.status} />
        </div>

        <div className="flex items-center gap-4 mt-3 flex-wrap">
          {lead.website && (
            <a href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
              target="_blank" rel="noopener noreferrer"
              className="text-xs hover:underline" style={{ color: "hsl(210, 100%, 65%)" }}>
              🌐 {lead.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          {lead.location && (
            <span className="text-xs" style={{ color: "#52525b" }}>📍 {lead.location}</span>
          )}
        </div>

        {lead.description && (
          <p className="text-sm leading-relaxed mt-3" style={{ color: "#71717a" }}>
            {lead.description}
          </p>
        )}
      </div>

      <div className="h-px mx-6" style={{ background: "#2a2a2a" }} />

      {/* Kontaktperson */}
      <div className="p-6 py-4 space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: "#3f3f46" }}>
          Entscheiderperson
        </p>
        {lead.contact_name && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">👤</span>
            <span className="text-sm font-medium text-white">{lead.contact_name}</span>
            {lead.contact_position && (
              <span className="text-xs" style={{ color: "#52525b" }}>· {lead.contact_position}</span>
            )}
          </div>
        )}
        {lead.contact_email && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">✉️</span>
            <a href={`mailto:${lead.contact_email}`} className="text-sm hover:underline" style={{ color: "#a1a1aa" }}>
              {lead.contact_email}
            </a>
          </div>
        )}
        {lead.phone && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">📞</span>
            <a href={`tel:${lead.phone}`} className="text-sm hover:underline" style={{ color: "#a1a1aa" }}>
              {lead.phone}
            </a>
          </div>
        )}
        {lead.linkedin_url && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">🔗</span>
            <a href={lead.linkedin_url} target="_blank" rel="noopener noreferrer"
              className="text-sm hover:underline" style={{ color: "hsl(210, 100%, 65%)" }}>
              LinkedIn-Profil
            </a>
          </div>
        )}
        {lead.preferred_contact_channel && (
          <div className="flex items-center gap-2.5 mt-1">
            <span className="text-sm">💬</span>
            <span className="text-xs px-2 py-0.5 rounded-md"
              style={{ background: "rgba(255,255,255,0.05)", color: "#71717a" }}>
              Empfohlen: {lead.preferred_contact_channel}
            </span>
          </div>
        )}
      </div>

      {/* Analyse Accordion */}
      {hasAnalyse && (
        <>
          <div className="h-px mx-6" style={{ background: "#2a2a2a" }} />
          <button onClick={() => setAnalyseOpen((v) => !v)}
            className="flex items-center justify-between px-6 py-3.5 text-sm font-medium transition-colors hover:bg-white/[0.02] cursor-pointer w-full text-left"
            style={{ color: "#52525b" }}>
            <span>Analyse anzeigen</span>
            {analyseOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {analyseOpen && (
            <div className="px-6 pb-6 space-y-4">
              {lead.fit_description && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "hsl(210, 100%, 65%)" }}>
                    Agentur-Fit
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#71717a" }}>{lead.fit_description}</p>
                </div>
              )}
              {lead.pain_point && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "hsl(210, 100%, 65%)" }}>
                    Pain Point
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#71717a" }}>{lead.pain_point}</p>
                </div>
              )}
              {lead.intent_signal && (
                <div className="rounded-lg p-3.5"
                  style={{ background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.15)" }}>
                  <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "#ca8a04" }}>
                    ⚡ Intent-Signal
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#a16207" }}>{lead.intent_signal}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
