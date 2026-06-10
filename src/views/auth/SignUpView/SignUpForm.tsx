"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import Input from "@/src/components/ui/Input";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import FormError from "@/src/components/form/FormError";
import { useAppDispatch } from "@/src/lib/store/hooks";
import { signupThunk } from "@/src/lib/store/slices/authSlice";

function scorePassword(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const STRENGTH = [
  { label: "Too weak", color: "#FF5A5F", width: "20%" },
  { label: "Weak", color: "#FF5A5F", width: "40%" },
  { label: "Okay", color: "#B8C1CC", width: "60%" },
  { label: "Strong", color: "#36E28A", width: "80%" },
  { label: "Excellent", color: "#00C16A", width: "100%" },
];

export default function SignUpForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const strength = useMemo(() => STRENGTH[scorePassword(password)], [
    password,
  ]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSubmitting(true);
    setError(null);
    try {
      await dispatch(
        signupThunk({
          name: String(form.get("name")),
          email: String(form.get("email")),
          password: String(form.get("password")),
        })
      ).unwrap();
      router.push("/admin");
    } catch (err) {
      setError(typeof err === "string" ? err : "Could not create account");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <FormError message={error} />
      <Input
        label="Full name"
        name="name"
        placeholder="e.g. Sayan Kar"
        autoComplete="name"
        required
      />
      <Input
        label="Work email"
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
          placeholder="At least 8 characters"
          autoComplete="new-password"
          minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password && (
          <div className="flex flex-col gap-1.5">
            <div className="h-1 w-full overflow-hidden rounded-full bg-bg-elevated">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{ width: strength.width, background: strength.color }}
              />
            </div>
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: strength.color }}
            >
              {strength.label}
            </span>
          </div>
        )}
      </div>

      <label className="flex cursor-pointer items-start gap-2.5 text-xs text-text-secondary">
        <input
          type="checkbox"
          required
          className="mt-0.5 h-3.5 w-3.5 accent-[#00D9FF]"
        />
        <span>
          I agree to the{" "}
          <a href="#" className="font-semibold text-accent hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="font-semibold text-accent hover:underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <PrimaryButton type="submit" size="lg" disabled={submitting}>
        {submitting ? "Creating account…" : "Create account"}
      </PrimaryButton>
    </form>
  );
}
