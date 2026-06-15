"use client";

import Link from "next/link";
import { memo, type ComponentType } from "react";
import { cn } from "@/src/utils/cn";

const NOOP = () => {};

type Variant = "default" | "theme" | "success" | "danger";

const VARIANTS: Record<Variant, { base: string; active: string }> = {
  default: {
    base: "border-border-card text-text-primary bg-bg-card hover:text-bg-base hover:border-accent-border hover:bg-accent",
    active: "bg-accent border-accent-border text-bg-base",
  },
  theme: {
    base: "border-accent-border bg-accent text-bg-base shadow-[0_0_24px_-4px_rgba(0,217,255,0.55)] hover:bg-accent-glow hover:shadow-[0_0_40px_-2px_rgba(0,217,255,0.85)]",
    active: "bg-accent-glow text-bg-base",
  },
  success: {
    base: "border-success bg-success text-bg-base hover:bg-success-light",
    active: "bg-success-light text-bg-base",
  },
  danger: {
    base: "border-danger bg-danger text-text-primary hover:bg-danger-soft",
    active: "bg-danger-soft text-text-primary",
  },
};

type IconProps = { className?: string };

type CommonButtonProps = {
  text: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  loading?: boolean;
  variant?: Variant;
  Icon?: ComponentType<IconProps>;
  disabled?: boolean;
  active?: boolean;
};

function CommonButton({
  href,
  onClick = NOOP,
  type = "button",
  className = "h-10 w-fit text-sm px-4",
  loading = false,
  text,
  variant = "theme",
  Icon,
  disabled,
  active = false,
}: CommonButtonProps) {
  const classes = cn(
    "relative flex items-center justify-center gap-2 rounded-lg border duration-300 ease-out capitalize overflow-hidden",
    "font-semibold truncate",
    "disabled:opacity-70 disabled:cursor-not-allowed",
    VARIANTS[variant].base,
    active ? VARIANTS[variant].active : "",
    className,
  );

  const content = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 hover:translate-x-full" />
      {Icon ? <Icon className="h-4 w-4" /> : null}
      <span className={cn("relative", loading ? "opacity-0" : "opacity-100")}>{text}</span>
      {loading ? (
        <span className="absolute left-1/2 -translate-x-1/2">
          <span className="block size-5 rounded-full border-2 border-white border-t-white/20 animate-spin" />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={classes}
    >
      {content}
    </button>
  );
}

export default memo(CommonButton);
