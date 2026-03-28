"use client";

interface Lead {
  id: string;
  company_name: string;
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
  week_added: string | null;
}

export default function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div
      className="rounded-xl border flex flex-col overflow-hidden transition-all duration-200"
      style={{ background: "hsl(220, 30%, 11%)", borderColor: "hsl(220, 30%, 20%)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(210, 100%, 65%, 0.4)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 24px hsl(210, 100%, 65%, 0.07)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(220, 30%, 20%)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Header: Firma */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold leading-tight" style={{ color: "hsl(210, 40%, 98%)" }}>
            {lead.company_name}
          </h2>
          {lead.industry && (
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium shrink-0"
              style={{ background: "hsl(210, 100%, 65%, 0.12)", color: "hsl(210, 100%, 65%)" }}
            >
              {lead.industry}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          {lead.website && (
            <a
              href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:underline"
              style={{ color: "hsl(210, 100%, 65%)" }}
            >
              🌐 {lead.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          {lead.location && (
            <span className="text-xs" style={{ color: "hsl(215, 20%, 55%)" }}>
              📍 {lead.location}
            </span>
          )}
        </div>

        {lead.description && (
          <p className="text-sm leading-relaxed mt-3" style={{ color: "hsl(215, 20%, 65%)" }}>
            {lead.description}
          </p>
        )}
      </div>

      {/* Trennlinie */}
      <div className="h-px mx-6" style={{ background: "hsl(220, 30%, 20%)" }} />

      {/* Kontaktperson */}
      <div className="p-6 py-4 space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: "hsl(215, 20%, 45%)" }}>
          Entscheiderperson
        </p>

        {lead.contact_name && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">👤</span>
            <span className="text-sm font-medium" style={{ color: "hsl(210, 40%, 98%)" }}>
              {lead.contact_name}
            </span>
            {lead.contact_position && (
              <span className="text-xs" style={{ color: "hsl(215, 20%, 55%)" }}>
                · {lead.contact_position}
              </span>
            )}
          </div>
        )}
        {lead.contact_email && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">✉️</span>
            <a href={`mailto:${lead.contact_email}`} className="text-sm hover:underline" style={{ color: "hsl(210, 40%, 88%)" }}>
              {lead.contact_email}
            </a>
          </div>
        )}
        {lead.phone && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">📞</span>
            <a href={`tel:${lead.phone}`} className="text-sm hover:underline" style={{ color: "hsl(210, 40%, 88%)" }}>
              {lead.phone}
            </a>
          </div>
        )}
        {lead.linkedin_url && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm">🔗</span>
            <a href={lead.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline truncate" style={{ color: "hsl(210, 100%, 65%)" }}>
              LinkedIn-Profil
            </a>
          </div>
        )}
        {lead.preferred_contact_channel && (
          <div className="flex items-center gap-2.5 mt-1">
            <span className="text-sm">💬</span>
            <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: "hsl(210, 100%, 65%, 0.1)", color: "hsl(210, 100%, 65%)" }}>
              Empfohlen: {lead.preferred_contact_channel}
            </span>
          </div>
        )}
      </div>

      {/* Analyse-Sektionen */}
      {(lead.fit_description || lead.pain_point || lead.intent_signal) && (
        <>
          <div className="h-px mx-6" style={{ background: "hsl(220, 30%, 20%)" }} />
          <div className="p-6 pt-4 space-y-4">

            {lead.fit_description && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "hsl(210, 100%, 65%)" }}>
                  Agentur-Fit
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(215, 20%, 65%)" }}>
                  {lead.fit_description}
                </p>
              </div>
            )}

            {lead.pain_point && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "hsl(210, 100%, 65%)" }}>
                  Pain Point
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(215, 20%, 65%)" }}>
                  {lead.pain_point}
                </p>
              </div>
            )}

            {lead.intent_signal && (
              <div
                className="rounded-lg p-3.5"
                style={{ background: "hsl(45, 100%, 60%, 0.07)", border: "1px solid hsl(45, 100%, 60%, 0.2)" }}
              >
                <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "hsl(45, 100%, 65%)" }}>
                  ⚡ Intent-Signal
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(215, 20%, 72%)" }}>
                  {lead.intent_signal}
                </p>
              </div>
            )}

          </div>
        </>
      )}
    </div>
  );
}
