import Container from "@/src/components/layout/Container";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import GhostButton from "@/src/components/buttons/GhostButton";
import Reveal from "@/src/components/layout/Reveal";

export default function HomeView() {
  return (
    <Container className="py-20 sm:py-28">
      <Reveal className="flex flex-col items-start gap-8 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-glow" />
          GameVault · v1
        </span>

        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
          A premium control room for{" "}
          <span className="text-accent">your game store</span>.
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          Ship faster. Manage your catalog, banners, auto-play videos, and
          pricing — all from one cyberpunk-clean admin panel built for the way
          you actually work.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <PrimaryButton href="/admin" size="lg">
            Open Admin Panel
          </PrimaryButton>
          <GhostButton href="/admin/games">Browse Games</GhostButton>
        </div>
      </Reveal>
    </Container>
  );
}
