import type { ReactNode } from "react";

type Tone = "accent" | "success" | "danger" | "neutral";

const TONES: Record<Tone, string> = {
  accent: "bg-accent/10 text-accent border-accent-border",
  success: "bg-success/10 text-success-light border-success/30",
  danger: "bg-danger/10 text-danger border-danger/30",
  neutral: "bg-bg-elevated text-text-secondary border-border-soft",
};

export default function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
