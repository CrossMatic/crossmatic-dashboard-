"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Card */}
        <div
          className="bg-white rounded-2xl p-8 border border-gray-100"
          style={{ boxShadow: "0 8px 48px 0 rgba(0,0,0,0.13), 0 2px 8px 0 rgba(0,0,0,0.07)" }}
        >
          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            Willkommen zurück
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Melden Sie sich an, um Ihre Leads zu sehen.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-gray-700">
                E-Mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ihre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:border-blue-400 focus-visible:ring-blue-100"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-700">
                Passwort
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:border-blue-400 focus-visible:ring-blue-100"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full font-semibold mt-2"
              style={{
                background: "hsl(210, 100%, 55%)",
                color: "#fff",
              }}
            >
              {loading ? "Wird geladen..." : "Einloggen →"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs mt-6 text-gray-400">
          Kein Account? Kontaktieren Sie uns.
        </p>
      </motion.div>
    </div>
  );
}
