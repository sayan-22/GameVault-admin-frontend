"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";
import Calendar, { parseISO } from "./Calendar";

type Props = {
  label?: string;
  name: string;
  defaultValue?: string; // ISO yyyy-mm-dd
  hint?: string;
  required?: boolean;
  placeholder?: string;
  containerClassName?: string;
};

// Custom date field: a styled trigger + a calendar popover (no native picker).
// The selected value rides on a hidden input so FormData picks it up.
export default function InputDate({
  label,
  name,
  defaultValue,
  hint,
  required,
  placeholder = "Select a date",
  containerClassName = "",
}: Props) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = parseISO(value);
  const display = selected
    ? selected.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";

  return (
    <div ref={ref} className={`flex flex-col gap-2 ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-medium uppercase tracking-wider text-text-secondary">
          {label}
        </label>
      )}

      {/* relative wraps only the trigger, so the popover anchors to the button
          (not the grid-stretched container) — keeps the gap tight. */}
      <div className="relative w-full">
        <button
          id={id}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="flex h-11 w-full items-center gap-2 rounded-md border border-border-soft bg-bg-elevated px-4 text-left text-sm outline-none transition-colors hover:border-accent-border focus-visible:border-accent"
        >
          <CalendarDays size={16} strokeWidth={1.8} className="shrink-0 text-text-muted" />
          <span className={`flex-1 truncate ${display ? "text-text-primary" : "text-text-muted"}`}>
            {display || placeholder}
          </span>
        </button>

        <input type="hidden" name={name} value={value} required={required} />

        {open && (
          <div className="absolute left-0 top-full z-50 mt-1">
            <Calendar
              value={value}
              onSelect={(iso) => {
                setValue(iso);
                setOpen(false);
              }}
              onClear={() => {
                setValue("");
                setOpen(false);
              }}
            />
          </div>
        )}
      </div>

      {hint && <span className="text-xs text-text-muted">{hint}</span>}
    </div>
  );
}
