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
    <div className="bg-white rounded-xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gray-200">

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {lead.logo_url ? (
              <img
                src={lead.logo_url}
                alt={`${lead.company_name} Logo`}
                className="w-10 h-10 rounded-lg object-contain shrink-0 border border-gray-100"
              />
            ) : (
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold"
                style={{ background: "hsl(210, 100%, 55%, 0.1)", color: "hsl(210, 100%, 50%)" }}
              >
                {lead.company_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-base font-semibold leading-tight text-gray-900 truncate">
                {lead.company_name}
              </h2>
              {lead.industry && (
                <span className="text-xs text-gray-400">{lead.industry}</span>
              )}
            </div>
          </div>
          <LeadStatusDropdown leadId={lead.id} initialStatus={lead.status} />
        </div>

        <div className="flex items-center gap-4 mt-3 flex-wrap">
          {lead.website && (
            <a
              href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:underline"
              style={{ color: "hsl(210, 100%, 50%)" }}
            >
              🌐 {lead.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          {lead.location && (
            <span className="text-xs text-gray-400">📍 {lead.location}</span>
          )}
        </div>

        {lead.description && (
          <p className="text-sm leading-relaxed mt-3 text-gray-500">{lead.description}</p>
        )}
      </div>

      {/* Divider */}
      <div className="h-px mx-6 bg-gray-100" />

      {/* Kontaktperson */}
      <div className="p-6 py-4 space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">
          Entscheiderperson
        </p>

        {lead.contact_name && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">👤</span>
            <span className="text-sm font-medium text-gray-800">{lead.contact_name}</span>
            {lead.contact_position && (
              <span className="text-xs text-gray-400">· {lead.contact_position}</span>
            )}
          </div>
        )}
        {lead.contact_email && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">✉️</span>
            <a href={`mailto:${lead.contact_email}`} className="text-sm text-gray-600 hover:underline">
              {lead.contact_email}
            </a>
          </div>
        )}
        {lead.phone && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">📞</span>
            <a href={`tel:${lead.phone}`} className="text-sm text-gray-600 hover:underline">
              {lead.phone}
            </a>
          </div>
        )}
        {lead.linkedin_url && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">🔗</span>
            <a
              href={lead.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
              style={{ color: "hsl(210, 100%, 50%)" }}
            >
              LinkedIn-Profil
            </a>
          </div>
        )}
        {lead.preferred_contact_channel && (
          <div className="flex items-center gap-2.5 mt-1">
            <span className="text-sm">💬</span>
            <span
              className="text-xs px-2 py-0.5 rounded-md"
              style={{ background: "hsl(210, 100%, 50%, 0.08)", color: "hsl(210, 100%, 45%)" }}
            >
              Empfohlen: {lead.preferred_contact_channel}
            </span>
          </div>
        )}
      </div>

      {/* Analyse Accordion */}
      {hasAnalyse && (
        <>
          <div className="h-px mx-6 bg-gray-100" />
          <button
            onClick={() => setAnalyseOpen((v) => !v)}
            className="flex items-center justify-between px-6 py-3.5 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-pointer w-full text-left"
          >
            <span>Analyse anzeigen</span>
            {analyseOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {analyseOpen && (
            <div className="px-6 pb-6 space-y-4">
              {lead.fit_description && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "hsl(210, 100%, 50%)" }}>
                    Agentur-Fit
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600">{lead.fit_description}</p>
                </div>
              )}
              {lead.pain_point && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "hsl(210, 100%, 50%)" }}>
                    Pain Point
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600">{lead.pain_point}</p>
                </div>
              )}
              {lead.intent_signal && (
                <div className="rounded-lg p-3.5 bg-amber-50 border border-amber-100">
                  <p className="text-xs font-medium uppercase tracking-wider mb-1.5 text-amber-600">
                    ⚡ Intent-Signal
                  </p>
                  <p className="text-sm leading-relaxed text-amber-800">{lead.intent_signal}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
