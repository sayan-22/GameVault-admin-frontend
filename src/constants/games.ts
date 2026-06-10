// The Game shape now comes from the API layer (zod-inferred), so the admin UI
// and the backend stay in lockstep. This file keeps only the static taxonomy
// and pure helpers the UI needs.
import type { Game } from "@/src/lib/api/schemas";

export type { Game, SystemRequirements } from "@/src/lib/api/schemas";

// The fixed taxonomy the storefront's Browse page filters by. Surfaced as
// quick-add chips when editing a game's tags.
export const CATEGORIES = [
  "Action",
  "RPG",
  "Strategy",
  "Indie",
  "Racing",
  "Adventure",
] as const;

// The spec rows the storefront's "System Requirements" tables render.
export const SPEC_FIELDS = ["OS", "CPU", "RAM", "GPU", "Storage"] as const;

export function finalPrice(game: Pick<Game, "price" | "discount" | "free">): number {
  if (game.free) return 0;
  if (!game.discount) return game.price;
  return Math.round(game.price * (1 - game.discount / 100) * 100) / 100;
}
