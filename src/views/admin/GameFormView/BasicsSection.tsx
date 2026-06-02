"use client";

import { useState, type KeyboardEvent } from "react";
import Input from "@/src/components/ui/Input";
import TextArea from "@/src/components/ui/TextArea";
import { CATEGORIES, type Game } from "@/src/constants/games";

type Props = {
  initial?: Partial<Game>;
  tags: string[];
  setTags: (tags: string[]) => void;
};

export default function BasicsSection({ initial, tags, setTags }: Props) {
  const [draft, setDraft] = useState("");

  function add(tag: string) {
    const t = tag.trim();
    if (!t || tags.some((x) => x.toLowerCase() === t.toLowerCase())) return;
    setTags([...tags, t]);
    setDraft("");
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(draft);
    } else if (e.key === "Backspace" && !draft && tags.length) {
      setTags(tags.slice(0, -1));
    }
  }

  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border-card bg-bg-card p-6">
      <h2 className="font-display text-base font-semibold text-text-primary">Basics</h2>

      <Input label="Title" name="title" placeholder="e.g. Neon Drift: Hyperion" defaultValue={initial?.title ?? ""} required />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Slug" name="slug" placeholder="neon-drift-hyperion" defaultValue={initial?.slug ?? ""} hint="Used in the storefront URL" />
        <Input label="Release date" name="releaseDate" type="date" defaultValue={initial?.releaseDate ?? ""} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Developer" name="developer" placeholder="Voltlight Studio" defaultValue={initial?.developer ?? ""} required />
        <Input label="Publisher" name="publisher" placeholder="Aurora Interactive" defaultValue={initial?.publisher ?? ""} required />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">Tags</span>
        <div className="flex flex-wrap items-center gap-2 rounded-md border border-border-soft bg-bg-elevated px-3 py-2">
          {tags.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
              {t}
              <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))} aria-label={`Remove ${t}`} className="cursor-pointer text-accent/70 hover:text-accent">
                ×
              </button>
            </span>
          ))}
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={tags.length ? "" : "Type a tag and press Enter"}
            className="min-w-32 flex-1 bg-transparent py-1 text-sm text-text-primary outline-none placeholder:text-text-muted"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[11px] text-text-muted">Quick add:</span>
          {CATEGORIES.map((c) => (
            <button key={c} type="button" onClick={() => add(c)} className="cursor-pointer rounded-full border border-border-soft px-2.5 py-0.5 text-[11px] text-text-secondary transition-colors hover:border-accent-border hover:text-accent">
              {c}
            </button>
          ))}
        </div>
      </div>

      <TextArea label="Description" name="description" placeholder="Tell players what makes this game special…" defaultValue={initial?.description ?? ""} />
    </section>
  );
}
