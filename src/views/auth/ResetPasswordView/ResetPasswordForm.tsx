"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import Input from "@/src/components/ui/Input";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import GhostButton from "@/src/components/buttons/GhostButton";
import FormError from "@/src/components/form/FormError";
import { useAppDispatch } from "@/src/lib/store/hooks";
import { resetPasswordThunk } from "@/src/lib/store/slices/authSlice";

export default function ResetPasswordForm() {
  const dispatch = useAppDispatch();
  const token = useSearchParams().get("token") ?? "";
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <div className="flex flex-col gap-5">
        <FormError message="This reset link is invalid or has expired." />
        <GhostButton href="/forgot-password">Request a new link</GhostButton>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-success/30 bg-success/5 px-4 py-6 text-center">
          <p className="font-display text-base font-semibold text-text-primary">
            Password updated
          </p>
          <p className="text-sm text-text-secondary">
            You can now sign in with your new password.
          </p>
        </div>
        <Link href="/signin">
          <PrimaryButton type="button" size="lg" className="w-full">
            Continue to sign in
          </PrimaryButton>
        </Link>
      </div>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setSubmitting(true);
    setError(null);
    try {
      await dispatch(resetPasswordThunk({ token, password })).unwrap();
      setDone(true);
    } catch (err) {
      setError(typeof err === "string" ? err : "Could not reset password");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <FormError message={error} />
      <Input
        label="New password"
        name="password"
        type="password"
        placeholder="At least 6 characters"
        autoComplete="new-password"
        minLength={6}
        required
      />
      <Input
        label="Confirm password"
        name="confirm"
        type="password"
        placeholder="Re-enter your password"
        autoComplete="new-password"
        minLength={6}
        required
      />
      <PrimaryButton type="submit" size="lg" disabled={submitting}>
        {submitting ? "Resetting…" : "Reset password"}
      </PrimaryButton>
    </form>
  );
}
