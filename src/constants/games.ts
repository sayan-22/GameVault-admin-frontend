// Admin Game model — mirrors the storefront's Game shape so the admin can
// produce/control exactly what the storefront renders. Source of truth:
// gamevault-user-frontend/src/constants/game.ts. Ratings/reviewCount are
// user-generated (read-only here); everything else is admin-editable.

export type SystemRequirements = {
  minimum: Record<string, string>;
  recommended: Record<string, string>;
};

export type Game = {
  id: string;
  title: string;
  slug: string;
  developer: string;
  publisher: string;
  tags: string[];
  description: string;
  price: number;
  discount?: number;
  free?: boolean;
  releaseDate: string;
  cover: string;
  banner: string;
  trailer: string;
  heroVideo?: string;
  screenshots: string[];
  systemRequirements: SystemRequirements;
  rating: number; // user-generated, read-only
  reviewCount: number; // user-generated, read-only
};

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

const img = (seed: string, w = 600, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;
const wide = (seed: string) => `https://picsum.photos/seed/${seed}/1600/900`;

const TRAILERS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
];

const stdReq: SystemRequirements = {
  minimum: {
    OS: "Windows 10 64-bit",
    CPU: "Intel Core i5-4670K / AMD Ryzen 3 1200",
    RAM: "8 GB",
    GPU: "NVIDIA GTX 960 4GB / AMD R9 280",
    Storage: "60 GB available",
  },
  recommended: {
    OS: "Windows 11 64-bit",
    CPU: "Intel Core i7-9700K / AMD Ryzen 5 5600X",
    RAM: "16 GB",
    GPU: "NVIDIA RTX 3060 / AMD RX 6600 XT",
    Storage: "60 GB SSD",
  },
};

const shots = (seed: string) => [
  wide(`${seed}-1`),
  wide(`${seed}-2`),
  wide(`${seed}-3`),
  wide(`${seed}-4`),
];

export const MOCK_GAMES: Game[] = [
  {
    id: "1", title: "Neon Drift: Hyperion", slug: "neon-drift-hyperion",
    cover: img("neon-drift"), banner: wide("neon-drift-banner"),
    trailer: TRAILERS[0], heroVideo: TRAILERS[0], price: 59.99, discount: 40,
    tags: ["Racing", "Cyberpunk", "Open World"],
    description: "Tear through a rain-slick megacity at 400 km/h. Hyperion blends arcade drifting with deep car tuning and a neon-drenched open world that responds to your driving style.",
    developer: "Voltlight Studio", publisher: "Aurora Interactive", releaseDate: "2026-03-14",
    screenshots: shots("neon"), rating: 4.7, reviewCount: 12840, systemRequirements: stdReq,
  },
  {
    id: "2", title: "Ashen Crown", slug: "ashen-crown",
    cover: img("ashen-crown"), banner: wide("ashen-banner"),
    trailer: TRAILERS[1], price: 49.99, discount: 25,
    tags: ["Action RPG", "Dark Fantasy", "Souls-like"],
    description: "A kingdom under perpetual eclipse. Forge your blade, master the parry, and unearth the truth buried beneath the Ashen Throne.",
    developer: "Ironvale", publisher: "Black Lantern Games", releaseDate: "2026-01-29",
    screenshots: shots("ashen"), rating: 4.6, reviewCount: 9320, systemRequirements: stdReq,
  },
  {
    id: "3", title: "Starbound Cartel", slug: "starbound-cartel",
    cover: img("starbound"), banner: wide("starbound-banner"),
    trailer: TRAILERS[2], price: 39.99,
    tags: ["Strategy", "Sci-Fi", "Management"],
    description: "Run smuggling routes between dying colonies. Negotiate, betray, and survive — every system has its price.",
    developer: "Pale Comet", publisher: "Pale Comet", releaseDate: "2026-05-10",
    screenshots: shots("star"), rating: 4.4, reviewCount: 4210, systemRequirements: stdReq,
  },
  {
    id: "4", title: "Hollow Tide", slug: "hollow-tide",
    cover: img("hollow-tide"), banner: wide("hollow-banner"),
    trailer: TRAILERS[3], price: 0, free: true,
    tags: ["Free to Play", "Roguelite", "Co-op"],
    description: "Dive into a drowned cathedral with up to four friends. Procedural depths, modular builds, no two runs alike.",
    developer: "Driftwood Collective", publisher: "Aurora Interactive", releaseDate: "2025-12-02",
    screenshots: shots("tide"), rating: 4.5, reviewCount: 21500, systemRequirements: stdReq,
  },
  {
    id: "5", title: "Paper Engine", slug: "paper-engine",
    cover: img("paper-engine"), banner: wide("paper-banner"),
    trailer: TRAILERS[4], price: 19.99, discount: 50,
    tags: ["Puzzle", "Indie", "Hand-drawn"],
    description: "Bend the rules of an origami world to escape its folds. 80 levels, all illustrated by hand.",
    developer: "Twofold", publisher: "Twofold", releaseDate: "2026-04-04",
    screenshots: shots("paper"), rating: 4.8, reviewCount: 3120, systemRequirements: stdReq,
  },
  {
    id: "6", title: "Frostline: Last Watch", slug: "frostline-last-watch",
    cover: img("frostline"), banner: wide("frost-banner"),
    trailer: TRAILERS[5], price: 69.99, discount: 15,
    tags: ["FPS", "Tactical", "Multiplayer"],
    description: "A six-vs-six tactical FPS set on a collapsing Arctic research base. Every match changes the map.",
    developer: "Ninth Wave", publisher: "Black Lantern Games", releaseDate: "2026-02-21",
    screenshots: shots("frost"), rating: 4.3, reviewCount: 18700, systemRequirements: stdReq,
  },
  {
    id: "7", title: "Verdant Veil", slug: "verdant-veil",
    cover: img("verdant"), banner: wide("verdant-banner"),
    trailer: TRAILERS[0], price: 0, free: true,
    tags: ["Free to Play", "Adventure", "Exploration"],
    description: "Walk an overgrown world that remembers every visitor. No combat, no UI — just listen.",
    developer: "Quietfern", publisher: "Quietfern", releaseDate: "2026-04-30",
    screenshots: shots("verdant"), rating: 4.6, reviewCount: 6730, systemRequirements: stdReq,
  },
  {
    id: "8", title: "Iron Sigil", slug: "iron-sigil",
    cover: img("iron-sigil"), banner: wide("iron-banner"),
    trailer: TRAILERS[1], price: 29.99, discount: 60,
    tags: ["Strategy", "Tactical", "Turn-Based"],
    description: "Lead a band of mercenaries through a fractured empire. Permadeath optional, regret guaranteed.",
    developer: "Hexbound", publisher: "Pale Comet", releaseDate: "2025-11-12",
    screenshots: shots("iron"), rating: 4.5, reviewCount: 7820, systemRequirements: stdReq,
  },
  {
    id: "9", title: "Helix Protocol", slug: "helix-protocol",
    cover: img("helix"), banner: wide("helix-banner"),
    trailer: TRAILERS[2], price: 44.99, discount: 30,
    tags: ["Action", "Stealth", "Sci-Fi"],
    description: "A corporate hacker turned ghost. Infiltrate, rewrite, escape — every level supports six approaches.",
    developer: "Voltlight Studio", publisher: "Aurora Interactive", releaseDate: "2026-05-01",
    screenshots: shots("helix"), rating: 4.7, reviewCount: 5410, systemRequirements: stdReq,
  },
  {
    id: "10", title: "Sable Republic", slug: "sable-republic",
    cover: img("sable"), banner: wide("sable-banner"),
    trailer: TRAILERS[3], price: 34.99,
    tags: ["RPG", "Political", "Branching Story"],
    description: "A nation on the brink. Your dialogue choices reshape borders, alliances, and the people who outlive you.",
    developer: "Ironvale", publisher: "Black Lantern Games", releaseDate: "2026-03-28",
    screenshots: shots("sable"), rating: 4.4, reviewCount: 2980, systemRequirements: stdReq,
  },
];

export function finalPrice(game: Pick<Game, "price" | "discount" | "free">): number {
  if (game.free) return 0;
  if (!game.discount) return game.price;
  return Math.round(game.price * (1 - game.discount / 100) * 100) / 100;
}
