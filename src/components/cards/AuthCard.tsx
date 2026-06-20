import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footerPrompt: string;
  footerLinkLabel: string;
  footerLinkHref: string;
  className?: string;
};

export default function AuthCard({
  eyebrow,
  title,
  description,
  children,
  footerPrompt,
  footerLinkLabel,
  footerLinkHref,
  className = "",
}: Props) {
  return (
    <article
      className={`card-glow flex flex-col gap-6 rounded-2xl border border-border-card bg-bg-card p-8 sm:p-10 ${className}`}
    >
      <header className="flex flex-col gap-3">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-border bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-glow" />
          {eyebrow}
        </span>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-text-primary">
          {title}
        </h1>
        <p className="text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      </header>

      {children}

      <p className="border-t border-border-soft pt-5 text-center text-xs text-text-muted">
        {footerPrompt}{" "}
        <Link
          href={footerLinkHref}
          className="font-semibold text-accent hover:underline"
        >
          {footerLinkLabel}
        </Link>
      </p>
    </article>
  );
}
