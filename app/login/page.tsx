"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-Mail oder Passwort ungültig.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "hsl(222, 50%, 7%)" }}>

      {/* Blauer Glow-Effekt im Hintergrund */}
      <div
        className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(210, 100%, 65%) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <span className="text-2xl font-bold tracking-tight" style={{ color: "hsl(210, 40%, 98%)" }}>
            Cross<span style={{ color: "hsl(210, 100%, 65%)" }}>Matic</span>
          </span>
        </div>

        {/* Card */}
        <div
          className="rounded-xl p-8 border"
          style={{
            background: "hsl(220, 30%, 11%)",
            borderColor: "hsl(220, 30%, 20%)",
          }}
        >
          <h1 className="text-xl font-semibold mb-1" style={{ color: "hsl(210, 40%, 98%)" }}>
            Willkommen zurück
          </h1>
          <p className="text-sm mb-8" style={{ color: "hsl(215, 20%, 65%)" }}>
            Melden Sie sich an, um Ihre Leads zu sehen.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" style={{ color: "hsl(215, 20%, 65%)" }}>
                E-Mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ihre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border text-sm"
                style={{
                  background: "hsl(220, 30%, 14%)",
                  borderColor: "hsl(220, 30%, 25%)",
                  color: "hsl(210, 40%, 98%)",
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" style={{ color: "hsl(215, 20%, 65%)" }}>
                Passwort
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border text-sm"
                style={{
                  background: "hsl(220, 30%, 14%)",
                  borderColor: "hsl(220, 30%, 25%)",
                  color: "hsl(210, 40%, 98%)",
                }}
              />
            </div>

            {error && (
              <p className="text-sm" style={{ color: "hsl(0, 84.2%, 60.2%)" }}>
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full font-semibold transition-opacity"
              style={{
                background: "hsl(210, 100%, 65%)",
                color: "hsl(222, 50%, 7%)",
              }}
            >
              {loading ? "Wird geladen..." : "Einloggen →"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "hsl(215, 20%, 45%)" }}>
          Kein Account? Kontaktieren Sie CrossMatic.
        </p>
      </div>
    </div>
  );
}
