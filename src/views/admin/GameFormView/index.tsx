import Container from "@/src/components/layout/Container";
import PageHeader from "@/src/components/layout/PageHeader";
import GhostButton from "@/src/components/buttons/GhostButton";
import Reveal from "@/src/components/layout/Reveal";
import { MOCK_GAMES, type Game } from "@/src/constants/games";
import GameForm from "./GameForm";

type Props =
  | { mode: "create"; id?: undefined }
  | { mode: "edit"; id: string };

function findGame(id: string): Game | undefined {
  return MOCK_GAMES.find((g) => g.id === id);
}

export default function GameFormView(props: Props) {
  const isEdit = props.mode === "edit";
  const game = isEdit ? findGame(props.id) : undefined;

  if (isEdit && !game) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-2xl font-semibold text-text-primary">
          Game not found
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          The game id <code className="text-accent">{props.id}</code> does
          not exist in the catalog.
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
        eyebrow={isEdit ? `Editing · ${game?.title}` : "New game"}
        title={isEdit ? "Edit game" : "Add a new game"}
        description={
          isEdit
            ? "Update the title, pricing, and media for this game."
            : "Fill in the details, upload a banner and a muted auto-play preview, then publish."
        }
        actions={<GhostButton href="/admin/games">Back to games</GhostButton>}
      />

      <Reveal>
        <GameForm
          mode={isEdit ? "edit" : "create"}
          initial={game ?? undefined}
        />
      </Reveal>
    </Container>
  );
}
