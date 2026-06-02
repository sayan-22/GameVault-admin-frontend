"use client";

import { useState } from "react";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import GhostButton from "@/src/components/buttons/GhostButton";
import Badge from "@/src/components/ui/Badge";
import { MOCK_GAMES, type Game } from "@/src/constants/games";

type Row = {
  id: string;
  title: string;
  developer: string;
  price: number;
  discount: number;
  free: boolean;
};

const toRows = (games: Game[]): Row[] =>
  games.map((g) => ({
    id: g.id,
    title: g.title,
    developer: g.developer,
    price: g.price,
    discount: g.discount ?? 0,
    free: g.free ?? false,
  }));

function priceClasses() {
  return "h-9 w-16 sm:w-20 rounded-md border border-border-soft bg-bg-elevated px-2 text-right text-sm text-text-primary outline-none focus:border-accent";
}

export default function PricesTable() {
  const [rows, setRows] = useState<Row[]>(() => toRows(MOCK_GAMES));
  const [dirty, setDirty] = useState(false);

  function update(id: string, key: "price" | "discount", value: number) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [key]: value } : r))
    );
    setDirty(true);
  }

  function reset() {
    setRows(toRows(MOCK_GAMES));
    setDirty(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border border-border-card bg-bg-card">
        <div className="hidden grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr] gap-4 border-b border-border-soft px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted lg:grid">
          <span>Title</span>
          <span className="text-right">Base price</span>
          <span className="text-right">Discount</span>
          <span className="text-right">Final</span>
          <span className="text-right">Status</span>
        </div>

        <ul className="divide-y divide-border-soft">
          {rows.map((row) => {
            const final = row.free ? 0 : row.price * (1 - row.discount / 100);
            return (
              <li
                key={row.id}
                className="grid grid-cols-2 items-center gap-4 px-5 py-4 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr]"
              >
                <div className="col-span-2 flex flex-col gap-0.5 lg:col-span-1">
                  <span className="font-display text-sm font-semibold text-text-primary">
                    {row.title}
                  </span>
                  <span className="text-xs text-text-muted">{row.developer}</span>
                </div>

                <label className="flex items-center justify-end gap-2 text-xs text-text-muted">
                  <span className="lg:hidden">Price</span>
                  <span>$</span>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    value={row.price}
                    disabled={row.free}
                    onChange={(e) =>
                      update(row.id, "price", Number(e.target.value))
                    }
                    className={priceClasses()}
                  />
                </label>

                <label className="flex items-center justify-end gap-2 text-xs text-text-muted">
                  <span className="lg:hidden">Discount</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={row.discount}
                    disabled={row.free}
                    onChange={(e) =>
                      update(row.id, "discount", Number(e.target.value))
                    }
                    className={priceClasses()}
                  />
                  <span>%</span>
                </label>

                <span className="text-right font-display text-sm font-bold text-text-primary">
                  ${final.toFixed(2)}
                </span>

                <div className="flex justify-end">
                  {row.free ? (
                    <Badge tone="accent">Free</Badge>
                  ) : row.discount > 0 ? (
                    <Badge tone="danger">On sale</Badge>
                  ) : (
                    <Badge tone="neutral">Regular</Badge>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-card bg-bg-card/95 px-4 py-3 backdrop-blur">
        <p className="text-xs text-text-muted">
          {dirty ? (
            <>
              <span className="text-accent">●</span> Unsaved price changes
            </>
          ) : (
            "All prices saved"
          )}
        </p>
        <div className="flex gap-2 ml-auto">
          <GhostButton size="sm" onClick={reset} disabled={!dirty}>
            Reset
          </GhostButton>
          <PrimaryButton
            size="sm"
            disabled={!dirty}
            onClick={() => setDirty(false)}
          >
            Save prices
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
