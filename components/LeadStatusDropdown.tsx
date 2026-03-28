"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ChevronDown } from "lucide-react";

const statuses = [
  { value: "neu", label: "Neu", color: "hsl(210, 100%, 65%)", bg: "rgba(59,130,246,0.12)" },
  { value: "kontaktiert", label: "Kontaktiert", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  { value: "in_gespräch", label: "In Gespräch", color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  { value: "abgeschlossen", label: "Abgeschlossen", color: "#34d399", bg: "rgba(52,211,153,0.12)" },
];

export default function LeadStatusDropdown({ leadId, initialStatus }: { leadId: string; initialStatus: string | null }) {
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
      <button onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium hover:opacity-80 cursor-pointer transition-opacity"
        style={{ background: current.bg, color: current.color }}>
        {current.label}
        <ChevronDown size={11} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 rounded-xl border py-1.5 min-w-[160px] shadow-2xl"
            style={{ background: "#1a1a1a", borderColor: "#2a2a2a" }}>
            {statuses.map((s) => (
              <button key={s.value} onClick={() => updateStatus(s.value)}
                className="w-full text-left px-3 py-2 text-xs font-medium flex items-center gap-2.5 hover:bg-white/5 transition-colors cursor-pointer"
                style={{ color: s.color }}>
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
