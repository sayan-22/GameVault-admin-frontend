"use client";

import { useState, type ChangeEvent } from "react";
import { DollarSign } from "lucide-react";
import { Input } from "@/src/components/ui";
import { SwitchToggleButton } from "@/src/components/buttons";
import { type Game } from "@/src/constants";

type Props = {
  initial?: Partial<Game>;
  free: boolean;
  setFree: (v: boolean) => void;
};

export default function PricingSection({ initial, free, setFree }: Props) {
  const [price, setPrice] = useState(() =>
    free ? "" : String(initial?.price ?? "")
  );
  const [discount, setDiscount] = useState(() =>
    free ? "" : String(initial?.discount ?? 0)
  );

  function handleFreeChange(nextFree: boolean) {
    if (nextFree) {
      setPrice("");
      setDiscount("");
    }
    setFree(nextFree);
  }

  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border-card bg-bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-base font-semibold text-text-primary">Pricing</h2>
        <SwitchToggleButton
          checked={free}
          label="Free to play"
          onCheckedChange={handleFreeChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Price (USD)"
          name="price"
          type="number"
          step="0.01"
          min={0}
          value={price}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPrice(event.target.value)
          }
          Icon={DollarSign}
          disabled={free}
          required={!free}
          hint={free ? "Disabled while Free to play is on" : undefined}
        />
        <Input
          label="Discount (%)"
          name="discount"
          type="number"
          min={0}
          max={100}
          value={discount}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setDiscount(event.target.value)
          }
          disabled={free}
        />
      </div>
      <input type="hidden" name="free" value={String(free)} />
    </section>
  );
}
