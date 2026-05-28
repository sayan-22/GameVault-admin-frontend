import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  hint?: string;
  error?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  containerClassName?: string;
};

export default function Input({
  label,
  hint,
  error,
  leading,
  trailing,
  containerClassName = "",
  className = "",
  id,
  ...rest
}: Props) {
  const inputId = id ?? rest.name ?? label?.toLowerCase().replace(/\s+/g, "-");

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
        className={`flex items-center gap-2 h-11 px-4 rounded-md border bg-bg-elevated transition-colors duration-200 focus-within:border-accent ${
          error ? "border-danger" : "border-border-soft"
        }`}
      >
        {leading && (
          <span className="text-text-muted shrink-0">{leading}</span>
        )}
        <input
          id={inputId}
          className={`flex-1 bg-transparent outline-none placeholder:text-text-muted text-text-primary text-sm ${className}`}
          {...rest}
        />
        {trailing && (
          <span className="text-text-muted shrink-0">{trailing}</span>
        )}
      </span>
      {(hint || error) && (
        <span
          className={`text-xs ${
            error ? "text-danger" : "text-text-muted"
          }`}
        >
          {error ?? hint}
        </span>
      )}
    </label>
  );
}
