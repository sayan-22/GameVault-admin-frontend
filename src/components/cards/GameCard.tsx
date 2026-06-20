import Link from "next/link";
import { Pencil } from "lucide-react";
import { Badge } from "@/src/components/ui";
import { IconButton } from "@/src/components/buttons";
import { finalPrice, type Game } from "@/src/constants";

function Cover({ game }: { game: Game }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-bg-elevated">
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
    <article className="hover-lift card-glow group flex h-full flex-col gap-4 rounded-xl border border-border-card bg-bg-card p-4">
      <Cover game={game} />

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-display text-base font-semibold text-text-primary line-clamp-1">
          {game.title}
        </h3>
        <p className="text-xs text-text-muted line-clamp-1">
          {game.developer} · {game.publisher}
        </p>
        <div className="flex flex-nowrap gap-1.5 overflow-hidden">
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
          <IconButton
            href={`/admin/games/${game.id}`}
            ariaLabel="Edit game"
            className="h-9 w-9 border-accent-border bg-bg-elevated text-accent transition-all duration-200 hover:bg-accent/10"
          >
            <Pencil size={14} />
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
