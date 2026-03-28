"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ChevronDown } from "lucide-react";

const statuses = [
  { value: "neu", label: "Neu", color: "hsl(210, 100%, 50%)", bg: "hsl(210, 100%, 50%, 0.1)" },
  { value: "kontaktiert", label: "Kontaktiert", color: "hsl(38, 92%, 45%)", bg: "hsl(38, 92%, 50%, 0.1)" },
  { value: "in_gespräch", label: "In Gespräch", color: "hsl(270, 60%, 55%)", bg: "hsl(270, 60%, 55%, 0.1)" },
  { value: "abgeschlossen", label: "Abgeschlossen", color: "hsl(145, 60%, 40%)", bg: "hsl(145, 60%, 40%, 0.1)" },
];

export default function LeadStatusDropdown({
  leadId,
  initialStatus,
}: {
  leadId: string;
  initialStatus: string | null;
}) {
  const [status, setStatus] = useState(initialStatus ?? "neu");
  const [open, setOpen] = useState(false);

  const current = statuses.find((s) => s.value === status) ?? statuses[0];

  async function updateStatus(value: string) {
    setStatus(value);
    setOpen(false);
    const supabase = createClient();
    await supabase.from("leads").update({ status: value }).eq("id", leadId);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium transition-opacity hover:opacity-75 cursor-pointer"
        style={{ background: current.bg, color: current.color }}
      >
        {current.label}
        <ChevronDown size={11} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 rounded-xl border border-gray-100 bg-white py-1.5 min-w-[160px] shadow-lg">
            {statuses.map((s) => (
              <button
                key={s.value}
                onClick={() => updateStatus(s.value)}
                className="w-full text-left px-3 py-2 text-xs font-medium flex items-center gap-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
                style={{ color: s.color }}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                {s.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
