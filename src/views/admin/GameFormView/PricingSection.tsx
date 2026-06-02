"use client";

import Input from "@/src/components/ui/Input";
import { type Game } from "@/src/constants/games";

type Props = {
  initial?: Partial<Game>;
  free: boolean;
  setFree: (v: boolean) => void;
};

export default function PricingSection({ initial, free, setFree }: Props) {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border-card bg-bg-card p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-base font-semibold text-text-primary">Pricing</h2>
        <label className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-text-secondary">
          Free to play
          <button
            type="button"
            role="switch"
            aria-checked={free}
            onClick={() => setFree(!free)}
            className={`relative h-6 w-11 rounded-full transition-colors ${free ? "bg-accent" : "bg-bg-elevated border border-border-soft"}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${free ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Price (USD)"
          name="price"
          type="number"
          step="0.01"
          min={0}
          defaultValue={initial?.price ?? ""}
          leading={<span className="text-sm">$</span>}
          disabled={free}
          required={!free}
          hint={free ? "Disabled while Free to play is on" : undefined}
        />
        <Input
          label="Discount (%)"
          name="discount"
          type="number"
          min={0}
          max={100}
          defaultValue={initial?.discount ?? 0}
          disabled={free}
        />
      </div>
      <input type="hidden" name="free" value={String(free)} />
    </section>
  );
}
