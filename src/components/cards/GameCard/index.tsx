import Link from "next/link";
import Badge from "@/src/components/ui/Badge";
import IconButton from "@/src/components/buttons/IconButton";
import {
  STATUS_LABEL,
  type Game,
  type GameStatus,
} from "@/src/constants/games";

const TONE: Record<GameStatus, "success" | "accent" | "neutral"> = {
  published: "success",
  draft: "accent",
  archived: "neutral",
};

function Cover({ game }: { game: Game }) {
  return (
    <div
      className="relative h-40 w-full overflow-hidden rounded-lg"
      style={{
        background: `radial-gradient(circle at 30% 20%, ${game.coverColor}55, transparent 60%), linear-gradient(135deg, #1f1f1f, #111111)`,
      }}
    >
      <div className="absolute inset-0 grid place-items-center">
        <span
          className="font-display text-4xl font-black tracking-tight"
          style={{ color: game.coverColor }}
        >
          {game.title
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")}
        </span>
      </div>
      {game.discount > 0 && (
        <span className="absolute top-3 left-3 rounded-md bg-danger px-2 py-1 text-[11px] font-bold text-white shadow-md">
          -{game.discount}%
        </span>
      )}
    </div>
  );
}

export default function GameCard({ game }: { game: Game }) {
  const finalPrice = game.price * (1 - game.discount / 100);

  return (
    <article className="hover-lift card-glow group flex flex-col gap-4 rounded-xl border border-border-card bg-bg-card p-4">
      <Cover game={game} />

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-base font-semibold text-text-primary line-clamp-1">
            {game.title}
          </h3>
          <Badge tone={TONE[game.status]}>{STATUS_LABEL[game.status]}</Badge>
        </div>
        <p className="text-xs text-text-muted">
          {game.studio} · {game.genre}
        </p>
      </div>

      <div className="flex items-end justify-between border-t border-border-soft pt-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-widest text-text-muted">
            Price
          </span>
          <div className="flex items-baseline gap-2">
            {game.discount > 0 && (
              <span className="text-xs text-text-muted line-through">
                ${game.price.toFixed(2)}
              </span>
            )}
            <span className="font-display text-lg font-bold text-text-primary">
              ${finalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <IconButton
            href={`/admin/games/${game.id}`}
            label="Edit game"
            size="sm"
            tone="accent"
          >
            <PencilIcon />
          </IconButton>
          <Link
            href={`/admin/games/${game.id}`}
            className="text-xs font-semibold text-accent hover:underline"
          >
            Edit →
          </Link>
        </div>
      </div>
    </article>
  );
}

function PencilIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}
