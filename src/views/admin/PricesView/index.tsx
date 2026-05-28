import Container from "@/src/components/layout/Container";
import PageHeader from "@/src/components/layout/PageHeader";
import GhostButton from "@/src/components/buttons/GhostButton";
import Reveal from "@/src/components/layout/Reveal";
import PricesTable from "./PricesTable";

export default function PricesView() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Catalog"
        title="Manage prices"
        description="Adjust base price and discount for every game in your store. Changes go live after you save."
        actions={<GhostButton href="/admin">Back to dashboard</GhostButton>}
      />

      <Reveal>
        <PricesTable />
      </Reveal>
    </Container>
  );
}
