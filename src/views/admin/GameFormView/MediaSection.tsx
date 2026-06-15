"use client";

import UploadCard from "@/src/components/cards/UploadCard";

export type MediaField =
  | "cover"
  | "banner"
  | "trailer"
  | "heroVideo"
  | "screenshots";

type Props = {
  onChange: (field: MediaField, files: File[]) => void;
  // Existing screenshot URLs (edit mode) to pre-fill the gallery.
  initialScreenshots?: string[];
  // New files + the existing URLs the admin chose to keep.
  onScreenshotsChange?: (files: File[], keptUrls: string[]) => void;
};

// Every visual asset the storefront renders for a game, grouped into one tidy
// panel: cover, hero banner, trailer + hero auto-play video, and the gallery.
export default function MediaSection({
  onChange,
  initialScreenshots,
  onScreenshotsChange,
}: Props) {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border-card bg-bg-card p-4 sm:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-base font-semibold text-text-primary">
          Media
        </h2>
        <p className="text-xs text-text-muted">
          Artwork and video shown on the storefront. Recommended sizes are noted
          on each.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <UploadCard
          label="Cover art"
          accept="image/*"
          hint="Card / box art · 3:4"
          kind="image"
          portrait
          onFilesChange={(f) => onChange("cover", f)}
        />
        <UploadCard
          label="Hero banner"
          accept="image/*"
          hint="Wide hero · 1920×1080 · ≤ 5 MB"
          kind="image"
          onFilesChange={(f) => onChange("banner", f)}
        />
        <UploadCard
          label="Trailer"
          accept="video/mp4,video/webm"
          hint="Game page video · MP4 / WebM · ≤ 500 MB"
          kind="video"
          onFilesChange={(f) => onChange("trailer", f)}
        />
        <UploadCard
          label="Hero auto-play (muted)"
          accept="video/mp4,video/webm"
          hint="Home hero loop · MP4 / WebM · ≤ 500 MB"
          kind="video"
          onFilesChange={(f) => onChange("heroVideo", f)}
        />
      </div>

      <UploadCard
        label="Screenshots"
        accept="image/*"
        hint="Gallery · add several · 16:9"
        kind="image"
        multiple
        size="lg"
        initialUrls={initialScreenshots}
        onMultiChange={onScreenshotsChange}
      />
    </section>
  );
}
