import { Container, PageHeader, Reveal } from "@/src/components/layout";
import { OutlineButton } from "@/src/components/buttons";
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
        actions={<OutlineButton href="/admin/games" text="Back to games" className="h-11 w-fit rounded-lg bg-bg-elevated px-5 text-sm" />}
      />
      <Reveal>
        <GameForm mode="create" />
      </Reveal>
    </Container>
  );
}
