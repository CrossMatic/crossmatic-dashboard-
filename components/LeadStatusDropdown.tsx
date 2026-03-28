"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ChevronDown } from "lucide-react";

const statuses = [
  { value: "neu", label: "Neu", color: "hsl(210, 100%, 65%)", bg: "hsl(210, 100%, 65%, 0.12)" },
  { value: "kontaktiert", label: "Kontaktiert", color: "hsl(45, 100%, 60%)", bg: "hsl(45, 100%, 60%, 0.12)" },
  { value: "in_gespräch", label: "In Gespräch", color: "hsl(270, 80%, 70%)", bg: "hsl(270, 80%, 70%, 0.12)" },
  { value: "abgeschlossen", label: "Abgeschlossen", color: "hsl(145, 70%, 55%)", bg: "hsl(145, 70%, 55%, 0.12)" },
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
        className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium transition-opacity hover:opacity-80 cursor-pointer"
        style={{ background: current.bg, color: current.color }}
      >
        {current.label}
        <ChevronDown size={11} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-8 z-20 rounded-lg border py-1 min-w-[150px] shadow-xl"
            style={{ background: "hsl(220, 30%, 13%)", borderColor: "hsl(220, 30%, 22%)" }}
          >
            {statuses.map((s) => (
              <button
                key={s.value}
                onClick={() => updateStatus(s.value)}
                className="w-full text-left px-3 py-2 text-xs font-medium transition-colors hover:opacity-80 cursor-pointer flex items-center gap-2"
                style={{ color: s.color }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: s.color }}
                />
                {s.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
