import GameFormView from "@/src/views/admin/GameFormView";

export const metadata = {
  title: "New game · GameVault Admin",
};

export default function AdminNewGamePage() {
  return <GameFormView mode="create" />;
}
