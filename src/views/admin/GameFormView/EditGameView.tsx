"use client";

import { useEffect } from "react";
import Container from "@/src/components/layout/Container";
import PageHeader from "@/src/components/layout/PageHeader";
import GhostButton from "@/src/components/buttons/GhostButton";
import Reveal from "@/src/components/layout/Reveal";
import LoadingView from "@/src/views/LoadingView";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { fetchGameById } from "@/src/lib/store/slices/gamesSlice";
import GameForm from "./GameForm";

export default function EditGameView({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const { current, currentStatus, currentError } = useAppSelector((s) => s.games);

  useEffect(() => {
    dispatch(fetchGameById(id));
  }, [dispatch, id]);

  if (currentStatus === "idle" || currentStatus === "loading") return <LoadingView />;

  if (currentStatus === "failed" || !current) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-2xl font-semibold text-text-primary">
          Game not found
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          {currentError ?? `No game exists with id ${id}.`}
        </p>
        <div className="mt-6 flex justify-center">
          <GhostButton href="/admin/games">Back to games</GhostButton>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <PageHeader
        eyebrow={`Editing · ${current.title}`}
        title="Edit game"
        description="Update the details, media, and pricing the storefront shows for this game."
        actions={<GhostButton href="/admin/games">Back to games</GhostButton>}
      />
      <Reveal>
        <GameForm mode="edit" initial={current} />
      </Reveal>
    </Container>
  );
}
