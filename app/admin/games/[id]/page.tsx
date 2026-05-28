import GameFormView from "@/src/views/admin/GameFormView";

export const metadata = {
  title: "Edit game · GameVault Admin",
};

export default async function AdminEditGamePage({
  params,
}: PageProps<"/admin/games/[id]">) {
  const { id } = await params;
  return <GameFormView mode="edit" id={id} />;
}
