"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useRouter, useSearchParams } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { AuthMode } from "@/types/auth";

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [supabase] = useState<SupabaseClient | null>(() => createClient());
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const nextPath = useMemo(() => {
    const next = searchParams.get("next");

    if (next && next.startsWith("/") && !next.startsWith("//")) {
      return next;
    }

    return "/";
  }, [searchParams]);

  const envError = searchParams.get("error") === "missing_env";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (!supabase) {
        throw new Error("Supabase is not configured yet. Add your environment variables before signing in.");
      }

      if (mode === "sign-up") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });

        if (error) {
          throw error;
        }

        if (data.session) {
          router.replace(nextPath);
          router.refresh();
        } else {
          setSuccessMessage("Account created. Check your email to confirm your address, then return here and sign in.");
          setMode("sign-in");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          throw error;
        }

        router.replace(nextPath);
        router.refresh();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Authentication failed.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
      <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[36px] border border-slate-200 bg-white/90 p-8 shadow-card sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Keldo</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Plan your tasks with less friction.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Sign in to access your private dashboard, track today&apos;s priorities, and keep your completed work organized across sessions.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-sm font-semibold text-slate-900">Private task storage</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Each user only sees their own tasks through Supabase auth and row-level security.</p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-sm font-semibold text-slate-900">Focused daily view</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Surface what is due today without digging through completed or future work.</p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-sm font-semibold text-slate-900">Simple CRUD flow</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Create, edit, complete, and delete tasks from a polished MVP-ready dashboard.</p>
            </article>
          </div>
        </section>

        <section className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
          <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setMode("sign-in")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${mode === "sign-in" ? "bg-slate-900 text-white" : "text-slate-600"}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("sign-up")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${mode === "sign-up" ? "bg-slate-900 text-white" : "text-slate-600"}`}
            >
              Sign Up
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              {mode === "sign-in" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {mode === "sign-in"
                ? "Use your email and password to continue to your Keldo dashboard."
                : "Get started with a simple email and password account for this MVP."}
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
              <input
                required
                minLength={6}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500"
                placeholder="At least 6 characters"
              />
            </label>

            {envError ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Supabase environment variables are missing. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.
              </div>
            ) : null}
            {errorMessage ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div> : null}
            {successMessage ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting || !supabase}
              className="w-full rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Working..." : mode === "sign-in" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {!supabase ? (
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` to enable authentication.
            </p>
          ) : null}
        </section>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[calc(100vh-5rem)] items-center justify-center text-sm text-slate-500">Loading authentication...</div>}>
      <AuthPageContent />
    </Suspense>
  );
}
