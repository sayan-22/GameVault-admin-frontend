import { Container, PageHeader, Reveal } from "@/src/components/layout";
import { OutlineButton } from "@/src/components/buttons";
import PricesTable from "./PricesTable";

export default function PricesView() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Catalog"
        title="Manage prices"
        description="Adjust base price and discount for every game in your store. Changes go live after you save."
        actions={<OutlineButton href="/admin" text="Back to dashboard" className="h-11 w-fit rounded-lg bg-bg-elevated px-5 text-sm" />}
      />

      <Reveal>
        <PricesTable />
      </Reveal>
    </Container>
  );
}
