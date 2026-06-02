import Link from "next/link";
import Badge from "@/src/components/ui/Badge";
import IconButton from "@/src/components/buttons/IconButton";
import { finalPrice, type Game } from "@/src/constants/games";

function Cover({ game }: { game: Game }) {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-lg bg-bg-elevated">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={game.banner}
        alt={`${game.title} banner`}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute left-3 top-3 flex gap-2">
        {game.free ? (
          <span className="rounded-md bg-accent px-2 py-1 text-[11px] font-bold text-[#001016] shadow-md">
            FREE
          </span>
        ) : (
          game.discount ? (
            <span className="rounded-md bg-success px-2 py-1 text-[11px] font-bold text-white shadow-md">
              -{game.discount}%
            </span>
          ) : null
        )}
      </div>
    </div>
  );
}

export default function GameCard({ game }: { game: Game }) {
  const final = finalPrice(game);

  return (
    <article className="hover-lift card-glow group flex flex-col gap-4 rounded-xl border border-border-card bg-bg-card p-4">
      <Cover game={game} />

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-base font-semibold text-text-primary line-clamp-1">
          {game.title}
        </h3>
        <p className="text-xs text-text-muted line-clamp-1">
          {game.developer} · {game.publisher}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {game.tags.slice(0, 3).map((t) => (
            <Badge key={t} tone="neutral">
              {t}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between border-t border-border-soft pt-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-widest text-text-muted">
            Price
          </span>
          <div className="flex items-baseline gap-2">
            {game.free ? (
              <span className="font-display text-lg font-bold text-accent">Free</span>
            ) : (
              <>
                {game.discount ? (
                  <span className="text-xs text-text-muted line-through">
                    ${game.price.toFixed(2)}
                  </span>
                ) : null}
                <span className="font-display text-lg font-bold text-text-primary">
                  ${final.toFixed(2)}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <IconButton href={`/admin/games/${game.id}`} label="Edit game" size="sm" tone="accent">
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}
