import Link from "next/link";
import { ArrowRight, Gamepad2, Plus, Tag, type LucideIcon } from "lucide-react";

type Action = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  tone: "accent" | "success" | "neutral";
};

const TONE_CLASS: Record<Action["tone"], string> = {
  accent: "bg-accent/10 text-accent border-accent-border",
  success: "bg-success/10 text-success-light border-success/30",
  neutral: "bg-bg-elevated text-text-secondary border-border-soft",
};

const ACTIONS: Action[] = [
  {
    href: "/admin/games/new",
    label: "Add new game",
    description: "Create a new title",
    icon: Plus,
    tone: "accent",
  },
  {
    href: "/admin/games",
    label: "Edit games",
    description: "Manage the catalog",
    icon: Gamepad2,
    tone: "success",
  },
  {
    href: "/admin/prices",
    label: "Adjust pricing",
    description: "Bulk edit & discounts",
    icon: Tag,
    tone: "neutral",
  },
];

export default function QuickActions() {
  return (
    <div className="hover-lift card-glow flex flex-col gap-5 rounded-xl border border-border-card bg-bg-card p-6">
      <header className="flex flex-col gap-1">
        <h3 className="font-display text-lg font-semibold text-text-primary">
          Quick actions
        </h3>
        <p className="text-xs text-text-muted">Jump back in</p>
      </header>

      <ul className="flex flex-1 flex-col justify-center gap-3">
        {ACTIONS.map((a) => {
          const Icon = a.icon;
          return (
            <li key={a.href}>
              <Link
                href={a.href}
                className="group flex items-center gap-4 rounded-lg border border-transparent bg-bg-elevated/40 px-3 py-3 transition-colors hover:border-accent-border hover:bg-bg-elevated"
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-md border ${TONE_CLASS[a.tone]}`}
                >
                  <Icon size={18} />
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="text-sm font-semibold text-text-primary">
                    {a.label}
                  </span>
                  <span className="text-xs text-text-muted">
                    {a.description}
                  </span>
                </span>
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
