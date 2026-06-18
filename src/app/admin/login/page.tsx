"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid password. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-background px-4">
      <Link
        href="/"
        className="absolute right-5 top-5 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        Back to site
        <ArrowLeft className="h-4 w-4 rotate-180" />
      </Link>

      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Image src={logo} alt="Skout AI" width={36} height={36} className="rounded-lg" />
          <div className="text-center">
            <h1 className="text-lg font-semibold">Admin Panel</h1>
            <p className="mt-1 text-sm text-muted-foreground">Enter your password to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              placeholder="••••••••"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
