"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import GhostButton from "@/src/components/buttons/GhostButton";
import LinkButton from "@/src/components/buttons/LinkButton";
import SwitchToggleButton from "@/src/components/buttons/SwitchToggleButton";
import FormError from "@/src/components/form/FormError";
import ConfirmModal from "@/src/components/modal/ConfirmModal";
import { SPEC_FIELDS, type Game } from "@/src/constants/games";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import {
  createGameThunk,
  deleteGameThunk,
  fetchGames,
  updateGameThunk,
} from "@/src/lib/store/slices/gamesSlice";
import BasicsSection from "./BasicsSection";
import PricingSection from "./PricingSection";
import RequirementsSection from "./RequirementsSection";
import MediaSection, { type MediaField } from "./MediaSection";

type Props = {
  initial?: Partial<Game>;
  mode: "create" | "edit";
};

export default function GameForm({ initial, mode }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);
  const [free, setFree] = useState<boolean>(initial?.free ?? false);
  const [trending, setTrending] = useState<boolean>(initial?.trending ?? false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [picked, setPicked] = useState<Partial<Record<MediaField, boolean>>>({});
  const files = useRef<Partial<Record<MediaField, File[]>>>({});
  // Live snapshot of the text inputs + the date, for the "all fields required"
  // disable-until-complete check (create mode).
  const [values, setValues] = useState<Record<string, string>>({});
  const [releaseDate, setReleaseDate] = useState(initial?.releaseDate ?? "");

  function snapshot(form: HTMLFormElement) {
    setValues(Object.fromEntries(new FormData(form)) as Record<string, string>);
  }

  // The Hero Auto-Play video is mandatory only for the very first game in the
  // store. Load the catalog (create mode) so we know whether it's empty.
  const games = useAppSelector((s) => s.games.list);
  const listStatus = useAppSelector((s) => s.games.listStatus);
  useEffect(() => {
    if (mode === "create") dispatch(fetchGames(undefined));
  }, [mode, dispatch]);

  const storeEmpty = listStatus === "succeeded" && games.length === 0;
  const heroRequired = mode === "create" && storeEmpty;

  function handleMedia(field: MediaField, files_: File[]) {
    files.current[field] = files_;
    setPicked((prev) => ({ ...prev, [field]: files_.length > 0 }));
  }

  function buildFormData(form: HTMLFormElement): FormData {
    const raw = new FormData(form);
    const fd = new FormData();
    fd.set("title", String(raw.get("title") ?? ""));
    for (const k of [
      "slug",
      "developer",
      "publisher",
      "description",
      "releaseDate",
    ]) {
      const v = raw.get(k);
      if (v !== null) fd.set(k, String(v));
    }
    fd.set("free", String(free));
    fd.set("price", free ? "0" : String(raw.get("price") ?? "0"));
    if (!free) fd.set("discount", String(raw.get("discount") ?? "0"));
    fd.set("trending", String(trending));
    fd.set("tags", tags.join(","));

    const minimum: Record<string, string> = {};
    const recommended: Record<string, string> = {};
    for (const f of SPEC_FIELDS) {
      const mn = raw.get(`min_${f}`);
      const rc = raw.get(`rec_${f}`);
      if (mn) minimum[f] = String(mn);
      if (rc) recommended[f] = String(rc);
    }
    fd.set("systemRequirements", JSON.stringify({ minimum, recommended }));

    for (const field of Object.keys(files.current) as MediaField[]) {
      const picked = files.current[field] ?? [];
      if (field === "screenshots")
        picked.forEach((file) => fd.append("screenshots", file));
      else if (picked[0]) fd.append(field, picked[0]);
    }
    return fd;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Required fields that aren't native inputs (create mode).
    if (mode === "create") {
      if (tags.length === 0) return setError("Add at least one tag.");
      if (!picked.cover) return setError("Cover art is required.");
      if (!picked.banner) return setError("Hero banner is required.");
      if (heroRequired && !picked.heroVideo) {
        return setError(
          "The first game must include a Hero Auto-Play (muted) video."
        );
      }
    }

    const fd = buildFormData(e.currentTarget);
    setSaving(true);
    setError(null);
    try {
      if (mode === "edit" && initial?.id)
        await dispatch(updateGameThunk({ id: initial.id, form: fd })).unwrap();
      else await dispatch(createGameThunk(fd)).unwrap();
      router.push("/admin/games");
    } catch (err) {
      setError(typeof err === "string" ? err : "Could not save the game");
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!initial?.id) return;
    setDeleting(true);
    try {
      await dispatch(deleteGameThunk(initial.id)).unwrap();
      router.push("/admin/games");
    } catch (err) {
      setError(typeof err === "string" ? err : "Could not delete the game");
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  // All fields required (create mode). Hero Auto-Play is only part of this when
  // it's the first game in the store (heroRequired).
  const textOk = ["title", "slug", "developer", "publisher", "description"].every(
    (k) => (values[k] ?? "").trim().length > 0
  );
  const priceOk = free || (values.price ?? "").trim().length > 0;
  const mediaOk =
    !!picked.cover &&
    !!picked.banner &&
    !!picked.trailer &&
    !!picked.screenshots &&
    (!heroRequired || !!picked.heroVideo);
  const createComplete =
    textOk && priceOk && releaseDate.trim().length > 0 && tags.length > 0 && mediaOk;
  const disableSubmit =
    saving || deleting || (mode === "create" && !createComplete);

  return (
    <form
      onSubmit={onSubmit}
      onInput={(e) => snapshot(e.currentTarget)}
      className="flex flex-col gap-6"
    >
      <FormError message={error} />

      <BasicsSection
        initial={initial}
        tags={tags}
        setTags={setTags}
        onReleaseDateChange={setReleaseDate}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PricingSection initial={initial} free={free} setFree={setFree} />

        <section className="flex flex-col gap-4 rounded-xl border border-border-card bg-bg-card p-4 sm:p-6">
          <div className="flex flex-col gap-1">
            <h2 className="font-display text-base font-semibold text-text-primary">
              Merchandising
            </h2>
            <p className="text-xs text-text-muted">
              Trending games are featured in the storefront&apos;s “Trending
              Now” row.
            </p>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-border-soft bg-bg-elevated/40 px-4 py-3">
            <span className="text-sm font-medium text-text-secondary">
              Show in “Trending Now”
            </span>
            <SwitchToggleButton
              checked={trending}
              label="Trending"
              onCheckedChange={setTrending}
              className="shrink-0"
            />
          </div>
        </section>
      </div>

      <RequirementsSection initial={initial} />

      {heroRequired && (
        <p className="rounded-xl border border-accent-border bg-accent/10 px-4 py-3 text-xs text-accent">
          This is the first game in your store, so a{" "}
          <strong>Hero Auto-Play (muted)</strong> video is required before you
          can create it.
        </p>
      )}

      <MediaSection onChange={handleMedia} />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-card bg-bg-card px-4 py-3">
        <p className="text-xs text-text-muted">
          {mode === "create"
            ? "Goes live on the storefront once saved."
            : "Edits apply to the storefront immediately on save."}
        </p>
        <div className="ml-auto flex items-center gap-3">
          {mode === "edit" && (
            <LinkButton
              text="Delete"
              onClick={() => setConfirmDelete(true)}
              variant="danger"
            />
          )}
          <GhostButton href="/admin/games" size="sm">
            Cancel
          </GhostButton>
          <PrimaryButton type="submit" size="sm" disabled={disableSubmit}>
            {saving
              ? "Saving…"
              : mode === "create"
                ? "Create game"
                : "Save changes"}
          </PrimaryButton>
        </div>
      </div>

      <ConfirmModal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={onDelete}
        loading={deleting}
        tone="danger"
        title="Delete this game?"
        description="It will be removed from the storefront permanently. This cannot be undone."
        confirmLabel="Yes, delete"
        cancelLabel="Keep it"
      />
    </form>
  );
}
