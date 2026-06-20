import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"textarea"> & {
  label?: string;
  hint?: string;
  error?: string;
};

export default function TextArea({
  label,
  hint,
  error,
  id,
  className = "",
  ...rest
}: Props) {
  const ta = id ?? rest.name ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={ta} className="flex flex-col gap-2">
      {label && (
        <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">
          {label}
        </span>
      )}
      <textarea
        id={ta}
        className={`min-h-28 w-full resize-y rounded-md border bg-bg-elevated px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent ${
          error ? "border-danger" : "border-border-soft"
        } ${className}`}
        {...rest}
      />
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
