"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiParticle {
  id: number;
  rotate: number;
  color: string;
}

const colors = ["#facc15", "#22c55e", "#3b82f6", "#f472b6", "#f97316"];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [particles, setParticles] = React.useState<ConfettiParticle[]>([]);

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

    // Confetti on success
    const newParticles: ConfettiParticle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: Date.now() + i,
      rotate: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
    setSuccess(true);

    setTimeout(() => setParticles([]), 1000);
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 1200);
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white">

      {/* Confetti */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-3 h-3 rounded-full"
            style={{ backgroundColor: p.color }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: p.rotate }}
            animate={{
              x: (Math.random() - 0.5) * 150,
              y: -Math.random() * 200,
              scale: 0,
              opacity: 0,
              rotate: p.rotate + Math.random() * 360,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Login Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900">Willkommen zurück</h2>


        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-Mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="ihre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-gray-200 text-gray-900 hover:scale-105 transition-transform duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Passwort</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-gray-200 text-gray-900 hover:scale-105 transition-transform duration-200"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading || success}
            size="lg"
            className="w-full mt-4 text-white hover:scale-110 transition-transform duration-200"
          >
            {success ? "Eingeloggt!" : loading ? "Wird geladen..." : "Einloggen →"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-2">
          Kein Account? Kontaktieren Sie uns.
        </p>
      </motion.div>
    </div>
  );
}
