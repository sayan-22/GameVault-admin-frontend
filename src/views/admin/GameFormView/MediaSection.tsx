import UploadCard from "@/src/components/cards/UploadCard";

// Mirrors every visual asset the storefront renders for a game:
// cover (card art), banner (hero background), trailer + hero auto-play video,
// and the screenshot gallery.
export default function MediaSection() {
  return (
    <div className="flex flex-col gap-6">
      <UploadCard
        label="Cover art"
        accept="image/*"
        hint="Card / box art · 3:4 · PNG / JPG / WebP"
        kind="image"
      />
      <UploadCard
        label="Hero banner"
        accept="image/*"
        hint="Wide hero · 1920×1080 · PNG / JPG / WebP · ≤ 5 MB"
        kind="image"
      />
      <UploadCard
        label="Trailer"
        accept="video/mp4,video/webm"
        hint="Plays on the game page · MP4 / WebM"
        kind="video"
      />
      <UploadCard
        label="Hero auto-play (muted)"
        accept="video/mp4,video/webm"
        hint="Short muted loop for the home hero · MP4 / WebM · ≤ 20 MB"
        kind="video"
      />
      <UploadCard
        label="Screenshots"
        accept="image/*"
        hint="Gallery images · add several · 16:9"
        kind="image"
        multiple
      />
    </div>
  );
}
