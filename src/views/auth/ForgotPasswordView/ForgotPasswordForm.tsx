"use client";

import { useState, type FormEvent } from "react";
import Input from "@/src/components/ui/Input";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import GhostButton from "@/src/components/buttons/GhostButton";
import FormError from "@/src/components/form/FormError";
import { useAppDispatch } from "@/src/lib/store/hooks";
import { forgotPasswordThunk } from "@/src/lib/store/slices/authSlice";

export default function ForgotPasswordForm() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await dispatch(forgotPasswordThunk(email)).unwrap();
      setSent(true);
    } catch (err) {
      setError(typeof err === "string" ? err : "Could not send reset link");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-success/30 bg-success/5 px-4 py-6 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-success/15 text-success-light">
            <MailCheckIcon />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-display text-base font-semibold text-text-primary">
              Check your inbox
            </p>
            <p className="text-sm text-text-secondary">
              We sent a reset link to{" "}
              <span className="font-semibold text-accent">{email}</span>. It
              expires in 30 minutes.
            </p>
          </div>
        </div>

        <GhostButton
          type="button"
          onClick={() => {
            setSent(false);
            setEmail("");
          }}
        >
          Use a different email
        </GhostButton>
      </div>
    );
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PrimaryButton type="submit" size="lg" disabled={submitting}>
        {submitting ? "Sending link…" : "Send reset link"}
      </PrimaryButton>
    </form>
  );
}

function MailCheckIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" />
      <polyline points="22 6 12 13 2 6" />
      <path d="m16 19 2 2 4-4" />
    </svg>
  );
}
