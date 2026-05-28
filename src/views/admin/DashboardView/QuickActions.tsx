import Link from "next/link";

type Action = {
  href: string;
  label: string;
  description: string;
  icon: () => React.ReactNode;
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
    description: "Create a fresh draft",
    icon: PlusIcon,
    tone: "accent",
  },
  {
    href: "/admin/banners",
    label: "Upload media",
    description: "Banners & auto-play",
    icon: ImageIcon,
    tone: "success",
  },
  {
    href: "/admin/prices",
    label: "Adjust pricing",
    description: "Bulk edit & discounts",
    icon: TagIcon,
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
                  <Icon />
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="text-sm font-semibold text-text-primary">
                    {a.label}
                  </span>
                  <span className="text-xs text-text-muted">
                    {a.description}
                  </span>
                </span>
                <ArrowRight />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
