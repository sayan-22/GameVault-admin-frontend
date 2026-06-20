"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Input } from "@/src/components/ui";
import { CommonButton } from "@/src/components/buttons";
import { FormError } from "@/src/components/form";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { signinThunk } from "@/src/lib/store/slices/authSlice";

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((s) => s.auth.user);
  const [submitting, setSubmitting] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Already signed in → skip the form.
  useEffect(() => {
    if (user) router.replace("/admin");
  }, [user, router]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSubmitting(true);
    setError(null);
    try {
      await dispatch(
        signinThunk({
          email: String(form.get("email")),
          password: String(form.get("password")),
          remember,
        })
      ).unwrap();
      router.push("/admin");
    } catch (err) {
      setError(typeof err === "string" ? err : "Could not sign in");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <FormError message={error} />
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

      <CommonButton
        type="submit"
        variant="theme"
        disabled={submitting}
        text={submitting ? "Signing in…" : "Sign in"}
        className="h-12 px-6 text-base"
      />
    </form>
  );
}
