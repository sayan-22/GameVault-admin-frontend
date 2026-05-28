import Container from "@/src/components/layout/Container";
import PageHeader from "@/src/components/layout/PageHeader";
import GhostButton from "@/src/components/buttons/GhostButton";
import UploadCard from "@/src/components/cards/UploadCard";
import Reveal from "@/src/components/layout/Reveal";
import { MOCK_GAMES } from "@/src/constants/games";

function ExistingBannerTile({
  title,
  color,
  studio,
}: {
  title: string;
  color: string;
  studio: string;
}) {
  return (
    <div className="hover-lift card-glow flex flex-col gap-3 rounded-xl border border-border-card bg-bg-card p-4">
      <div
        className="relative h-32 w-full overflow-hidden rounded-lg"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}55, transparent 60%), linear-gradient(135deg, #1f1f1f, #111)`,
        }}
      >
        <div className="absolute inset-0 grid place-items-center">
          <span
            className="font-display text-2xl font-black"
            style={{ color }}
          >
            {title
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
        </div>
      </div>
      <div>
        <p className="font-display text-sm font-semibold text-text-primary">
          {title}
        </p>
        <p className="text-xs text-text-muted">{studio}</p>
      </div>
    </div>
  );
}

export default function BannersView() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Media"
        title="Banners &amp; auto-play videos"
        description="Upload hero banners and short muted previews. These appear on the storefront and game detail pages."
        actions={<GhostButton href="/admin">Back to dashboard</GhostButton>}
      />

      <Reveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <UploadCard
            label="Featured banner"
            accept="image/*"
            hint="Recommended 1920×1080 · PNG, JPG, WebP · ≤ 5 MB"
            kind="image"
          />
          <UploadCard
            label="Hero auto-play (muted)"
            accept="video/mp4,video/webm"
            hint="Short loop · MP4 / WebM · ≤ 20 MB · Will auto-play muted on the storefront"
            kind="video"
          />
        </div>
      </Reveal>

      <section className="mt-12">
        <div className="flex items-end justify-between pb-6">
          <div>
            <h2 className="font-display text-xl font-semibold text-text-primary">
              Current banners
            </h2>
            <p className="text-sm text-text-muted">
              Banners currently live on the storefront
            </p>
          </div>
          <GhostButton href="/admin/games" size="sm">
            Manage games →
          </GhostButton>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {MOCK_GAMES.slice(0, 4).map((g, i) => (
            <Reveal key={g.id} delay={i * 70}>
              <ExistingBannerTile
                title={g.title}
                color={g.coverColor}
                studio={g.studio}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </Container>
  );
}
