import Container from "@/src/components/layout/Container";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import GhostButton from "@/src/components/buttons/GhostButton";

export default function NotFoundView() {
  return (
    <Container className="grid min-h-[70dvh] place-items-center py-16">
      <div className="flex max-w-xl flex-col items-center gap-8 text-center">
        <div className="relative">
          <span
            aria-hidden
            className="absolute inset-0 grid place-items-center font-display text-[10rem] font-black tracking-tight text-accent/15 blur-sm"
          >
            404
          </span>
          <span className="relative font-display text-[7rem] font-black tracking-tight text-text-primary">
            4<span className="text-accent">0</span>4
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-display text-2xl font-semibold text-text-primary">
            Game over — page not found
          </h1>
          <p className="text-sm leading-relaxed text-text-secondary">
            The URL you tried doesn&apos;t exist in this vault. Head back to
            the dashboard or browse the catalog.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <PrimaryButton href="/admin">Go to Dashboard</PrimaryButton>
          <GhostButton href="/">Back home</GhostButton>
        </div>
      </div>
    </Container>
  );
}
