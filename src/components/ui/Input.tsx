"use client";

import { useState, type ComponentPropsWithoutRef } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

type Props = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  hint?: string;
  error?: string;
  // Lucide icon component (e.g. Search, DollarSign). Rendered as a button —
  // pass `onClickIcon` to make it actionable (search, clear, etc.).
  Icon?: LucideIcon;
  iconPosition?: "leading" | "trailing";
  onClickIcon?: () => void;
  containerClassName?: string;
  // Override the field-box height (defaults to h-11) — e.g. "h-12".
  fieldClassName?: string;
};

export default function Input({
  label,
  hint,
  error,
  Icon,
  iconPosition = "leading",
  onClickIcon,
  containerClassName = "",
  fieldClassName = "h-11",
  className = "",
  id,
  type = "text",
  ...rest
}: Props) {
  const inputId = id ?? rest.name ?? label?.toLowerCase().replace(/\s+/g, "-");

  // Password fields get a built-in show/hide toggle — no per-form duplication.
  const isPassword = type === "password";
  const [reveal, setReveal] = useState(false);
  const resolvedType = isPassword && reveal ? "text" : type;

  // Password reuses the same icon slot: Eye/EyeOff with a toggle handler.
  const RenderIcon = isPassword ? (reveal ? EyeOff : Eye) : Icon;
  const handleIconClick = isPassword ? () => setReveal((v) => !v) : onClickIcon;
  const iconSide = isPassword ? "trailing" : iconPosition;

  const iconNode = RenderIcon ? (
    <button
      type="button"
      onClick={handleIconClick}
      tabIndex={handleIconClick ? 0 : -1}
      aria-label={
        isPassword ? (reveal ? "Hide password" : "Show password") : undefined
      }
      className="shrink-0 cursor-pointer text-text-secondary transition-colors duration-300 hover:text-text-primary focus:outline-none focus-visible:text-accent"
    >
      <RenderIcon
        className="w-[clamp(1rem,1.6vw,1.5rem)] h-[clamp(1rem,1.6vw,1.5rem)]"
        strokeWidth={1.8}
      />
    </button>
  ) : null;

  return (
    <label
      htmlFor={inputId}
      className={`flex flex-col gap-2 ${containerClassName}`}
    >
      {label && (
        <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">
          {label}
        </span>
      )}
      <span
        className={`flex items-center gap-2 ${fieldClassName} px-4 rounded-md border bg-bg-elevated transition-colors duration-200 focus-within:border-accent ${
          error ? "border-danger" : "border-border-soft"
        }`}
      >
        {iconSide === "leading" && iconNode}
        <input
          id={inputId}
          type={resolvedType}
          className={`flex-1 bg-transparent outline-none placeholder:text-text-muted text-text-primary text-sm ${className}`}
          {...rest}
        />
        {iconSide === "trailing" && iconNode}
      </span>
      {(hint || error) && (
        <span
          className={`text-xs ${error ? "text-danger" : "text-text-muted"}`}
        >
          {error ?? hint}
        </span>
      )}
    </label>
  );
}
