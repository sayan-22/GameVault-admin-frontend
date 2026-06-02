import type { LucideIcon } from "lucide-react";

type Props = {
  text: string;
  className?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
};

// A lightweight inline link-style button (text + optional icon). Navigation is
// the caller's job via onClick, so it stays decoupled from any one route.
export default function LinkButton({
  text,
  className = "",
  onClick,
  icon: Icon,
  iconPosition = "right",
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-accent transition-colors hover:text-accent-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${className}`}
    >
      {Icon && iconPosition === "left" ? (
        <Icon
          size={20}
          strokeWidth={1.8}
          className="transition-transform group-hover:-translate-x-0.5"
        />
      ) : null}
      {text}
      {Icon && iconPosition === "right" ? (
        <Icon
          size={20}
          strokeWidth={1.8}
          className="transition-transform group-hover:translate-x-0.5"
        />
      ) : null}
    </button>
  );
}
