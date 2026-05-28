"use client";

import { useState, type FormEvent } from "react";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import GhostButton from "@/src/components/buttons/GhostButton";
import Input from "@/src/components/ui/Input";
import TextArea from "@/src/components/ui/TextArea";
import UploadCard from "@/src/components/cards/UploadCard";
import {
  GENRES,
  STATUS_LABEL,
  type Game,
  type GameStatus,
} from "@/src/constants/games";

type Props = {
  initial?: Partial<Game>;
  mode: "create" | "edit";
};

const STATUSES: GameStatus[] = ["draft", "published", "archived"];

export default function GameForm({ initial, mode }: Props) {
  const [status, setStatus] = useState<GameStatus>(
    initial?.status ?? "draft"
  );
  const [saving, setSaving] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 900);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]"
    >
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-5 rounded-xl border border-border-card bg-bg-card p-6">
          <h2 className="font-display text-base font-semibold text-text-primary">
            Basics
          </h2>
          <Input
            label="Title"
            name="title"
            placeholder="e.g. Cyberpunk 2099"
            defaultValue={initial?.title ?? ""}
            required
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              label="Studio"
              name="studio"
              placeholder="Neon Forge"
              defaultValue={initial?.studio ?? ""}
              required
            />
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">
                Genre
              </span>
              <select
                name="genre"
                defaultValue={initial?.genre ?? "Action"}
                className="h-11 rounded-md border border-border-soft bg-bg-elevated px-3 text-sm text-text-primary outline-none focus:border-accent"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <TextArea
            label="Description"
            name="description"
            placeholder="Tell players what makes this game special…"
            defaultValue=""
          />
        </section>

        <section className="flex flex-col gap-5 rounded-xl border border-border-card bg-bg-card p-6">
          <h2 className="font-display text-base font-semibold text-text-primary">
            Pricing &amp; stock
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Input
              label="Price (USD)"
              name="price"
              type="number"
              step="0.01"
              min={0}
              defaultValue={initial?.price ?? ""}
              leading={<span className="text-sm">$</span>}
              required
            />
            <Input
              label="Discount (%)"
              name="discount"
              type="number"
              min={0}
              max={100}
              defaultValue={initial?.discount ?? 0}
            />
            <Input
              label="Stock"
              name="stock"
              type="number"
              min={0}
              defaultValue={initial?.stock ?? 0}
            />
          </div>
        </section>

        <section className="flex flex-col gap-5 rounded-xl border border-border-card bg-bg-card p-6">
          <h2 className="font-display text-base font-semibold text-text-primary">
            Status
          </h2>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                  status === s
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border-soft bg-bg-elevated text-text-secondary hover:text-text-primary"
                }`}
              >
                {STATUS_LABEL[s]}
              </button>
            ))}
          </div>
          <input type="hidden" name="status" value={status} />
        </section>
      </div>

      <aside className="flex flex-col gap-6">
        <UploadCard
          label="Cover banner"
          accept="image/*"
          hint="Recommended 1920×1080 · PNG / JPG / WebP"
          kind="image"
        />
        <UploadCard
          label="Auto-play preview (muted)"
          accept="video/mp4,video/webm"
          hint="Short loop · MP4 / WebM · ≤ 20 MB"
          kind="video"
        />

        <div className="flex flex-col gap-3 rounded-xl border border-border-card bg-bg-card p-6">
          <h3 className="font-display text-sm font-semibold text-text-primary">
            Save your changes
          </h3>
          <p className="text-xs text-text-muted">
            {mode === "create"
              ? "Draft is saved until you publish."
              : "Edits apply immediately on save."}
          </p>
          <div className="mt-1 flex flex-col gap-2">
            <PrimaryButton type="submit" disabled={saving}>
              {saving
                ? "Saving…"
                : mode === "create"
                ? "Create game"
                : "Save changes"}
            </PrimaryButton>
            <GhostButton href="/admin/games" size="sm">
              Cancel
            </GhostButton>
          </div>
        </div>
      </aside>
    </form>
  );
}
