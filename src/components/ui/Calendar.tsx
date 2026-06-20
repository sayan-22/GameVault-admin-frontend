"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export function parseISO(s?: string): Date | null {
  const m = s ? /^(\d{4})-(\d{2})-(\d{2})/.exec(s) : null;
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return isNaN(d.getTime()) ? null : d;
}

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

type Mode = "days" | "months" | "years";

const navBtn = "grid h-8 w-8 place-items-center rounded-md text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary";

type Props = {
  value: string;
  onSelect: (iso: string) => void;
  onClear: () => void;
};

export default function Calendar({ value, onSelect, onClear }: Props) {
  const selected = parseISO(value);
  const today = new Date();
  const [mode, setMode] = useState<Mode>("days");
  const [view, setView] = useState(() => {
    const b = selected ?? today;
    return new Date(b.getFullYear(), b.getMonth(), 1);
  });

  const yearStart = Math.floor(view.getFullYear() / 12) * 12;

  // Arrows step by month (days), year (months), or 12 years (years).
  const shift = (dir: number) => {
    const y = view.getFullYear();
    if (mode === "days") setView(new Date(y, view.getMonth() + dir, 1));
    else if (mode === "months") setView(new Date(y + dir, view.getMonth(), 1));
    else setView(new Date(y + dir * 12, view.getMonth(), 1));
  };

  const title =
    mode === "days"
      ? `${FULL[view.getMonth()]} ${view.getFullYear()}`
      : mode === "months"
        ? `${view.getFullYear()}`
        : `${yearStart} – ${yearStart + 11}`;

  // Clicking the title zooms out: days → months → years (quick navigation).
  const zoomOut = () => setMode(mode === "days" ? "months" : "years");

  const dayCells = useMemo(() => {
    const y = view.getFullYear();
    const m = view.getMonth();
    const lead = new Date(y, m, 1).getDay();
    const total = new Date(y, m + 1, 0).getDate();
    const out: (Date | null)[] = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= total; d++) out.push(new Date(y, m, d));
    return out;
  }, [view]);

  const cell = (active: boolean, h: string) =>
    `grid ${h} place-items-center rounded-md text-sm transition-colors ${
      active
        ? "bg-accent font-semibold text-[#001016]"
        : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
    }`;

  return (
    <div className="w-72 max-w-[calc(100vw-3rem)] rounded-xl border border-border-card bg-bg-card p-3 shadow-lift">
      <div className="mb-2 flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} aria-label="Previous" className={navBtn}>
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={zoomOut}
          className="rounded-md px-2 py-1 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
        >
          {title}
        </button>
        <button type="button" onClick={() => shift(1)} aria-label="Next" className={navBtn}>
          <ChevronRight size={18} />
        </button>
      </div>

      {mode === "days" && (
        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((w) => (
            <span key={w} className="grid h-7 place-items-center text-[10px] font-semibold uppercase text-text-muted">
              {w}
            </span>
          ))}
          {dayCells.map((d, i) =>
            d ? (
              <button
                key={i}
                type="button"
                onClick={() => onSelect(toISO(d))}
                className={
                  selected && sameDay(d, selected)
                    ? cell(true, "h-9")
                    : sameDay(d, today)
                      ? `${cell(false, "h-9")} border border-accent-border text-text-primary`
                      : cell(false, "h-9")
                }
              >
                {d.getDate()}
              </button>
            ) : (
              <span key={i} />
            )
          )}
        </div>
      )}

      {mode === "months" && (
        <div className="grid grid-cols-3 gap-1">
          {MONTHS.map((mn, i) => (
            <button
              key={mn}
              type="button"
              onClick={() => {
                setView(new Date(view.getFullYear(), i, 1));
                setMode("days");
              }}
              className={cell(
                !!selected && selected.getFullYear() === view.getFullYear() && selected.getMonth() === i,
                "h-10"
              )}
            >
              {mn}
            </button>
          ))}
        </div>
      )}

      {mode === "years" && (
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 12 }, (_, i) => yearStart + i).map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => {
                setView(new Date(yr, view.getMonth(), 1));
                setMode("months");
              }}
              className={cell(!!selected && selected.getFullYear() === yr, "h-10")}
            >
              {yr}
            </button>
          ))}
        </div>
      )}

      <div className="mt-2 flex items-center justify-between border-t border-border-soft pt-2">
        <button type="button" onClick={onClear} className="text-xs font-medium text-text-muted hover:text-text-primary">
          Clear
        </button>
        <button type="button" onClick={() => onSelect(toISO(today))} className="text-xs font-semibold text-accent hover:text-accent-glow">
          Today
        </button>
      </div>
    </div>
  );
}
