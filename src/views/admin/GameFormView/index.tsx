import Container from "@/src/components/layout/Container";
import PageHeader from "@/src/components/layout/PageHeader";
import GhostButton from "@/src/components/buttons/GhostButton";
import Reveal from "@/src/components/layout/Reveal";
import GameForm from "./GameForm";
import EditGameView from "./EditGameView";

type Props = { mode: "create"; id?: undefined } | { mode: "edit"; id: string };

export default function GameFormView(props: Props) {
  if (props.mode === "edit") return <EditGameView id={props.id} />;

  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="New game"
        title="Add a new game"
        description="Fill in the details, add tags, upload media, and set requirements — it goes live on the storefront when saved."
        actions={<GhostButton href="/admin/games">Back to games</GhostButton>}
      />
      <Reveal>
        <GameForm mode="create" />
      </Reveal>
    </Container>
  );
}
