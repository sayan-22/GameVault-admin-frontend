export type GameStatus = "published" | "draft" | "archived";

export type Game = {
  id: string;
  title: string;
  studio: string;
  genre: string;
  price: number;
  discount: number;
  stock: number;
  status: GameStatus;
  rating: number;
  releaseDate: string;
  coverColor: string;
};

export const GENRES = [
  "Action",
  "Adventure",
  "RPG",
  "FPS",
  "Strategy",
  "Racing",
  "Sports",
  "Simulation",
  "Indie",
  "Horror",
] as const;

export const MOCK_GAMES: Game[] = [
  {
    id: "cyberpunk-2099",
    title: "Cyberpunk 2099",
    studio: "Neon Forge",
    genre: "RPG",
    price: 59.99,
    discount: 25,
    stock: 1240,
    status: "published",
    rating: 4.6,
    releaseDate: "2025-11-12",
    coverColor: "#00D9FF",
  },
  {
    id: "shadow-protocol",
    title: "Shadow Protocol",
    studio: "Eclipse Studios",
    genre: "FPS",
    price: 49.99,
    discount: 0,
    stock: 880,
    status: "published",
    rating: 4.3,
    releaseDate: "2025-09-04",
    coverColor: "#FF5A5F",
  },
  {
    id: "starforge-odyssey",
    title: "Starforge Odyssey",
    studio: "Helion Works",
    genre: "Adventure",
    price: 39.99,
    discount: 40,
    stock: 320,
    status: "published",
    rating: 4.8,
    releaseDate: "2025-06-21",
    coverColor: "#36E28A",
  },
  {
    id: "neon-drift",
    title: "Neon Drift",
    studio: "Pulse Games",
    genre: "Racing",
    price: 29.99,
    discount: 15,
    stock: 540,
    status: "draft",
    rating: 4.1,
    releaseDate: "2026-02-10",
    coverColor: "#21C7E5",
  },
  {
    id: "ironclad-tactics",
    title: "Ironclad Tactics",
    studio: "Vanguard Lab",
    genre: "Strategy",
    price: 34.99,
    discount: 0,
    stock: 110,
    status: "published",
    rating: 4.4,
    releaseDate: "2025-03-30",
    coverColor: "#B23A48",
  },
  {
    id: "lumen-hollow",
    title: "Lumen Hollow",
    studio: "Twilight Forge",
    genre: "Horror",
    price: 24.99,
    discount: 50,
    stock: 60,
    status: "archived",
    rating: 4.2,
    releaseDate: "2024-10-31",
    coverColor: "#8B949E",
  },
];

export const STATUS_LABEL: Record<GameStatus, string> = {
  published: "Published",
  draft: "Draft",
  archived: "Archived",
};
