"use client";

import Link from "next/link";
import { memo, type ComponentType } from "react";
import { cn } from "@/src/utils/cn";

const NOOP = () => {};

type IconProps = { className?: string };

type OutlineButtonProps = {
  text: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
  Icon?: ComponentType<IconProps>;
  iconPosition?: "left" | "right";
  type?: "button" | "submit";
  disabled?: boolean;
};

// Single outline style. Renders a Next <Link> when `href` is given, otherwise a
// <button>. Size/shape/background come from `className`.
function OutlineButton({
  text,
  href,
  onClick = NOOP,
  active,
  className = "h-10 w-fit rounded-lg px-4 text-sm",
  Icon,
  iconPosition = "right",
  type = "button",
  disabled,
}: OutlineButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 border font-medium transition-all duration-300 ease-out",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    active
      ? "border-accent-border bg-accent/15 text-accent"
      : "border-border-card text-text-secondary hover:border-accent-border hover:text-text-primary",
    className,
  );

  const content = (
    <>
      {Icon && iconPosition === "left" ? <Icon className="h-4 w-4" /> : null}
      {text}
      {Icon && iconPosition === "right" ? <Icon className="h-4 w-4" /> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}

export default memo(OutlineButton);
