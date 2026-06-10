"use client";

import { useEffect, useState } from "react";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import GhostButton from "@/src/components/buttons/GhostButton";
import Badge from "@/src/components/ui/Badge";
import FormError from "@/src/components/form/FormError";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import {
  fetchGames,
  updatePricesThunk,
} from "@/src/lib/store/slices/gamesSlice";
import type { PriceUpdate } from "@/src/lib/api/games";

type Edit = { price?: number; discount?: number };

// Fixed-width bordered box so Base price + Discount inputs line up exactly,
// with the unit ($ / %) sitting inside. Final value and Status badge share the
// same right edge, so all four value columns align.
const FIELD_WRAP =
  "flex h-9 w-20 sm:w-24 items-center gap-1 rounded-md border border-border-soft bg-bg-elevated px-2 transition-colors focus-within:border-accent";
const FIELD_INPUT =
  "w-full bg-transparent text-right text-sm text-text-primary outline-none disabled:opacity-50";

export default function PricesTable() {
  const dispatch = useAppDispatch();
  const { list, listStatus, listError } = useAppSelector((s) => s.games);
  const [edits, setEdits] = useState<Record<string, Edit>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchGames(undefined));
  }, [dispatch]);

  const games = list;
  const loading = listStatus === "idle" || listStatus === "loading";
  const dirty = Object.keys(edits).length > 0;

  function update(id: string, key: keyof Edit, value: number) {
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }));
  }

  function reset() {
    setEdits({});
    setSaveError(null);
  }

  async function save() {
    const updates: PriceUpdate[] = Object.entries(edits).map(([id, e]) => ({
      id,
      ...e,
    }));
    setSaving(true);
    setSaveError(null);
    try {
      await dispatch(updatePricesThunk(updates)).unwrap();
      setEdits({});
      dispatch(fetchGames(undefined));
    } catch (err) {
      setSaveError(typeof err === "string" ? err : "Could not save prices");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="h-64 animate-pulse rounded-xl border border-border-card bg-bg-card" />
    );
  }
  if (listError) return <FormError message={listError} />;

  return (
    <div className="flex flex-col gap-4">
      <FormError message={saveError} />
      <div className="overflow-hidden rounded-xl border border-border-card bg-bg-card">
        <div className="hidden grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr] gap-4 border-b border-border-soft px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted lg:grid">
          <span>Title</span>
          <span className="text-center">Base price</span>
          <span className="text-center">Discount</span>
          <span className="text-center">Final</span>
          <span className="text-center">Status</span>
        </div>

        <ul className="divide-y divide-border-soft">
          {games.map((game) => {
            const price = edits[game.id]?.price ?? game.price;
            const discount = edits[game.id]?.discount ?? game.discount ?? 0;
            const final = game.free ? 0 : price * (1 - discount / 100);
            const statusBadge = game.free ? (
              <Badge tone="accent">Free</Badge>
            ) : discount > 0 ? (
              <Badge tone="danger">On sale</Badge>
            ) : (
              <Badge tone="neutral">Regular</Badge>
            );
            return (
              <li
                key={game.id}
                className="flex flex-col gap-3 px-4 py-4 lg:grid lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr] lg:items-center lg:gap-4 lg:px-5"
              >
                <div className="flex items-start justify-between gap-3 lg:block">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display text-sm font-semibold text-text-primary">
                      {game.title}
                    </span>
                    <span className="text-xs text-text-muted">
                      {game.developer}
                    </span>
                  </div>
                  <span className="lg:hidden">{statusBadge}</span>
                </div>

                <label className="flex items-center justify-between gap-2 text-xs text-text-muted lg:justify-center">
                  <span className="lg:hidden">Base price</span>
                  <span className={FIELD_WRAP}>
                    <span className="text-text-muted">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min={0}
                      value={price}
                      disabled={game.free}
                      onChange={(e) =>
                        update(game.id, "price", Number(e.target.value))
                      }
                      className={FIELD_INPUT}
                    />
                  </span>
                </label>

                <label className="flex items-center justify-between gap-2 text-xs text-text-muted lg:justify-center">
                  <span className="lg:hidden">Discount</span>
                  <span className={FIELD_WRAP}>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={discount}
                      disabled={game.free}
                      onChange={(e) =>
                        update(game.id, "discount", Number(e.target.value))
                      }
                      className={FIELD_INPUT}
                    />
                    <span className="text-text-muted">%</span>
                  </span>
                </label>

                <div className="flex items-center justify-between lg:block lg:text-center">
                  <span className="text-xs text-text-muted lg:hidden">Final</span>
                  <span className="font-display text-sm font-bold text-text-primary">
                    ${final.toFixed(2)}
                  </span>
                </div>

                <div className="hidden justify-center lg:flex">{statusBadge}</div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-card bg-bg-card px-4 py-3">
        <p className="text-xs text-text-muted">
          {dirty ? (
            <>
              <span className="text-accent">●</span> Unsaved price changes
            </>
          ) : (
            "All prices saved"
          )}
        </p>
        <div className="ml-auto flex gap-2">
          <GhostButton size="sm" onClick={reset} disabled={!dirty || saving}>
            Reset
          </GhostButton>
          <PrimaryButton size="sm" disabled={!dirty || saving} onClick={save}>
            {saving ? "Saving…" : "Save prices"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
