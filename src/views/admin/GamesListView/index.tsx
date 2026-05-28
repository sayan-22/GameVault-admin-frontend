"use client";

import { useMemo, useState } from "react";
import Container from "@/src/components/layout/Container";
import PageHeader from "@/src/components/layout/PageHeader";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import GhostButton from "@/src/components/buttons/GhostButton";
import GameCard from "@/src/components/cards/GameCard";
import Input from "@/src/components/ui/Input";
import Reveal from "@/src/components/layout/Reveal";
import {
  MOCK_GAMES,
  STATUS_LABEL,
  type GameStatus,
} from "@/src/constants/games";

const FILTERS: Array<{ key: GameStatus | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "published", label: STATUS_LABEL.published },
  { key: "draft", label: STATUS_LABEL.draft },
  { key: "archived", label: STATUS_LABEL.archived },
];

function FilterPills({
  active,
  onChange,
}: {
  active: GameStatus | "all";
  onChange: (k: GameStatus | "all") => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-border-soft bg-bg-elevated p-1">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          type="button"
          onClick={() => onChange(f.key)}
          className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
            active === f.key
              ? "bg-accent text-[#001016]"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default function GamesListView() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<GameStatus | "all">("all");

  const games = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_GAMES.filter((g) => {
      const matchStatus = filter === "all" || g.status === filter;
      const matchQuery =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.studio.toLowerCase().includes(q) ||
        g.genre.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [query, filter]);

  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Catalog"
        title="Games"
        description="Add, edit, and manage every title in your store."
        actions={
          <>
            <GhostButton href="/admin">Back to dashboard</GhostButton>
            <PrimaryButton href="/admin/games/new">+ New game</PrimaryButton>
          </>
        }
      />

      <div className="flex flex-col gap-4 pb-8 lg:flex-row lg:items-center lg:justify-between">
        <Input
          containerClassName="w-full lg:max-w-md"
          placeholder="Search by title, studio, or genre"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leading={<SearchIcon />}
        />
        <FilterPills active={filter} onChange={setFilter} />
      </div>

      {games.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border-card bg-bg-card py-20 text-center">
          <p className="font-display text-lg text-text-primary">
            No games match your filters
          </p>
          <p className="text-sm text-text-muted">
            Try clearing the search or selecting a different status.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((g, i) => (
            <Reveal key={g.id} delay={i * 60}>
              <GameCard game={g} />
            </Reveal>
          ))}
        </div>
      )}
    </Container>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
