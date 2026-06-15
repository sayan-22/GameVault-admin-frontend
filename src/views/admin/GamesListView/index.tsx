"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/src/components/layout/Container";
import PageHeader from "@/src/components/layout/PageHeader";
import CommonButton from "@/src/components/buttons/CommonButton";
import OutlineButton from "@/src/components/buttons/OutlineButton";
import GameCard from "@/src/components/cards/GameCard";
import SkeletonCard from "@/src/components/cards/SkeletonCard";
import Input from "@/src/components/ui/Input";
import Reveal from "@/src/components/layout/Reveal";
import FormError from "@/src/components/form/FormError";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { fetchGames } from "@/src/lib/store/slices/gamesSlice";

type Filter = "all" | "free" | "sale";

const FILTERS: Array<{ key: Filter; label: string }> = [
  { key: "all", label: "All" },
  { key: "free", label: "Free" },
  { key: "sale", label: "On sale" },
];

function FilterPills({
  active,
  onChange,
}: {
  active: Filter;
  onChange: (k: Filter) => void;
}) {
  return (
    <div className="flex h-12 items-center gap-1 rounded-md border border-border-soft bg-bg-elevated px-2">
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
  const [filter, setFilter] = useState<Filter>("all");
  const dispatch = useAppDispatch();
  const { list, listStatus, listError } = useAppSelector((s) => s.games);

  // Server-side search: debounce the query into GET /admin/games?search=…
  useEffect(() => {
    const t = setTimeout(() => {
      dispatch(fetchGames(query.trim() || undefined));
    }, 300);
    return () => clearTimeout(t);
  }, [dispatch, query]);

  const loading = listStatus === "idle" || listStatus === "loading";
  const error = listError;

  // The Free / On-sale pills filter the search results client-side.
  const games = useMemo(
    () =>
      list.filter(
        (g) =>
          filter === "all" ||
          (filter === "free" && g.free) ||
          (filter === "sale" && !g.free && (g.discount ?? 0) > 0),
      ),
    [list, filter],
  );

  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Catalog"
        title="Games"
        description="Add, edit, and manage every title shown on the storefront."
        actions={
          <>
            <OutlineButton href="/admin" text="Back to dashboard" className="h-11 w-fit rounded-lg bg-bg-elevated px-5 text-sm" />
            <CommonButton href="/admin/games/new" text="+ New game" variant="theme" className="h-11 w-fit px-5 text-sm" />
          </>
        }
      />

      <div className="flex flex-col gap-4 pb-8 lg:flex-row lg:items-center lg:justify-between">
        <Input
          containerClassName="w-full lg:max-w-md"
          fieldClassName="h-12"
          placeholder="Search by title, studio, or publisher"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leading={<SearchIcon />}
        />
        <FilterPills active={filter} onChange={setFilter} />
      </div>

      {error && <FormError message={error} />}

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : games.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border-card bg-bg-card py-20 text-center">
          <p className="font-display text-lg text-text-primary">
            No games match your filters
          </p>
          <p className="text-sm text-text-muted">
            Try clearing the search, choosing a different filter, or adding a
            game.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g, i) => (
            <Reveal key={g.id} delay={i * 60} className="h-full">
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
