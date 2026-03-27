"use client";

interface Lead {
  id: string;
  company_name: string;
  contact_name: string | null;
  contact_email: string | null;
  phone: string | null;
  social_media_url: string | null;
  website: string | null;
  fit_description: string | null;
  week_added: string | null;
}

export default function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div
      className="rounded-xl border p-6 flex flex-col gap-5 transition-all duration-200 hover:border-opacity-80"
      style={{
        background: "hsl(220, 30%, 11%)",
        borderColor: "hsl(220, 30%, 20%)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "hsl(210, 100%, 65%, 0.4)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 20px hsl(210, 100%, 65%, 0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "hsl(220, 30%, 20%)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Kopfzeile */}
      <div>
        <h2
          className="text-lg font-semibold leading-tight"
          style={{ color: "hsl(210, 40%, 98%)" }}
        >
          {lead.company_name}
        </h2>
        {lead.website && (
          <a
            href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs mt-0.5 inline-block hover:underline"
            style={{ color: "hsl(210, 100%, 65%)" }}
          >
            {lead.website}
          </a>
        )}
      </div>

      {/* Trennlinie */}
      <div
        className="h-px w-full"
        style={{ background: "hsl(220, 30%, 20%)" }}
      />

      {/* Kontaktdaten */}
      <div className="space-y-2.5">
        {lead.contact_name && (
          <div className="flex items-center gap-2.5">
            <span className="text-base">👤</span>
            <span className="text-sm" style={{ color: "hsl(210, 40%, 98%)" }}>
              {lead.contact_name}
            </span>
          </div>
        )}
        {lead.contact_email && (
          <div className="flex items-center gap-2.5">
            <span className="text-base">✉️</span>
            <a
              href={`mailto:${lead.contact_email}`}
              className="text-sm hover:underline"
              style={{ color: "hsl(210, 40%, 88%)" }}
            >
              {lead.contact_email}
            </a>
          </div>
        )}
        {lead.phone && (
          <div className="flex items-center gap-2.5">
            <span className="text-base">📞</span>
            <a
              href={`tel:${lead.phone}`}
              className="text-sm hover:underline"
              style={{ color: "hsl(210, 40%, 88%)" }}
            >
              {lead.phone}
            </a>
          </div>
        )}
        {lead.social_media_url && (
          <div className="flex items-center gap-2.5">
            <span className="text-base">🔗</span>
            <a
              href={lead.social_media_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline truncate"
              style={{ color: "hsl(210, 100%, 65%)" }}
            >
              LinkedIn / Social Media
            </a>
          </div>
        )}
      </div>

      {/* Fit-Beschreibung */}
      {lead.fit_description && (
        <>
          <div
            className="h-px w-full"
            style={{ background: "hsl(220, 30%, 20%)" }}
          />
          <div>
            <p
              className="text-xs font-medium uppercase tracking-wider mb-2"
              style={{ color: "hsl(210, 100%, 65%)" }}
            >
              Warum ein guter Fit
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "hsl(215, 20%, 72%)" }}
            >
              {lead.fit_description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
