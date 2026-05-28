"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import Input from "@/src/components/ui/Input";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";

export default function SignInForm() {
  const [submitting, setSubmitting] = useState(false);
  const [remember, setRemember] = useState(true);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 900);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="you@studio.com"
        autoComplete="email"
        required
      />
      <div className="flex flex-col gap-2">
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />
        <div className="flex items-center justify-between gap-2 text-xs">
          <label className="flex cursor-pointer items-center gap-2 text-text-secondary">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-3.5 w-3.5 accent-[#00D9FF]"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="font-semibold text-accent hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <PrimaryButton type="submit" size="lg" disabled={submitting}>
        {submitting ? "Signing in…" : "Sign in"}
      </PrimaryButton>
    </form>
  );
}
