import Input from "@/src/components/ui/Input";
import { SPEC_FIELDS, type Game } from "@/src/constants/games";

function SpecColumn({
  title,
  prefix,
  specs,
  accent,
}: {
  title: string;
  prefix: "min" | "rec";
  specs?: Record<string, string>;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-lg border p-5 ${
        accent ? "border-accent-border bg-accent/5" : "border-border-soft bg-bg-elevated/40"
      }`}
    >
      <h3 className="font-display text-sm font-semibold text-text-primary">{title}</h3>
      {SPEC_FIELDS.map((field) => (
        <Input
          key={field}
          label={field}
          name={`${prefix}_${field}`}
          defaultValue={specs?.[field] ?? ""}
          placeholder={field === "OS" ? "Windows 11 64-bit" : ""}
        />
      ))}
    </div>
  );
}

export default function RequirementsSection({ initial }: { initial?: Partial<Game> }) {
  const req = initial?.systemRequirements;

  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border-card bg-bg-card p-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-base font-semibold text-text-primary">
          System requirements
        </h2>
        <p className="text-xs text-text-muted">
          Shown as min/recommended tables on the storefront game page.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <SpecColumn title="Minimum" prefix="min" specs={req?.minimum} />
        <SpecColumn title="Recommended" prefix="rec" specs={req?.recommended} accent />
      </div>
    </section>
  );
}
