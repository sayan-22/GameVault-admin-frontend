"use client";

import { useState, type FormEvent } from "react";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import GhostButton from "@/src/components/buttons/GhostButton";
import { type Game } from "@/src/constants/games";
import BasicsSection from "./BasicsSection";
import PricingSection from "./PricingSection";
import RequirementsSection from "./RequirementsSection";
import MediaSection from "./MediaSection";

type Props = {
  initial?: Partial<Game>;
  mode: "create" | "edit";
};

export default function GameForm({ initial, mode }: Props) {
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);
  const [free, setFree] = useState<boolean>(initial?.free ?? false);
  const [saving, setSaving] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 900);
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-6">
        <BasicsSection initial={initial} tags={tags} setTags={setTags} />
        <PricingSection initial={initial} free={free} setFree={setFree} />
        <RequirementsSection initial={initial} />
        {tags.map((t) => (
          <input key={t} type="hidden" name="tags[]" value={t} />
        ))}
      </div>

      <aside className="flex flex-col gap-6">
        <MediaSection />

        <div className="flex flex-col gap-3 rounded-xl border border-border-card bg-bg-card p-6">
          <h3 className="font-display text-sm font-semibold text-text-primary">
            Save your changes
          </h3>
          <p className="text-xs text-text-muted">
            {mode === "create"
              ? "The game goes live on the storefront once saved."
              : "Edits apply to the storefront immediately on save."}
          </p>
          <div className="mt-1 flex flex-col gap-2">
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? "Saving…" : mode === "create" ? "Create game" : "Save changes"}
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
