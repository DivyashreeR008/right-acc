"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type FormEvent, useState } from "react";

export default function LoginPage() {
  const [notice, setNotice] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(
      "Sign-in is not connected in this prototype. Account access will be enabled with the authentication backend.",
    );
  };

  return (
    <main className="min-h-full bg-slate-50/70">
      <div className="mx-auto grid max-w-5xl overflow-hidden px-4 py-6 sm:px-6 lg:grid-cols-2 lg:px-8">
        <section
          className="relative hidden min-h-[520px] items-end overflow-hidden rounded-l-2xl bg-cover bg-center p-8 text-white lg:flex"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85')",
          }}
        >
          <div className="absolute inset-0 bg-slate-950/65" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
              Right Account
            </p>
            <h1 className="mt-3 font-heading text-3xl font-bold">
              Your business connections, in one place.
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-200">
              Sign in to manage your provider profile or continue a customer
              enquiry.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-9 lg:rounded-l-none">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Account access
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
            Sign in
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your account details to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
              Email address
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className="h-11 rounded-lg border border-border px-3 text-sm font-normal text-foreground outline-none focus:border-primary"
                placeholder="you@company.com"
              />
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
              Password
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                className="h-11 rounded-lg border border-border px-3 text-sm font-normal text-foreground outline-none focus:border-primary"
                placeholder="Enter your password"
              />
            </label>
            <Button type="submit" className="h-11 w-full">
              Sign in
            </Button>
          </form>

          {notice && (
            <p
              aria-live="polite"
              className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900"
            >
              {notice}
            </p>
          )}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Right Account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
