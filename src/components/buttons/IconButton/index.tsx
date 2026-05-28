import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  label: string;
  size?: "sm" | "md";
  tone?: "neutral" | "accent" | "danger";
  className?: string;
};

type AsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };
type AsLink = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href"
  >;

type Props = AsButton | AsLink;

const SIZE = {
  sm: "h-9 w-9",
  md: "h-10 w-10",
};

const TONE = {
  neutral:
    "text-text-secondary hover:text-text-primary hover:border-accent-border",
  accent: "text-accent border-accent-border hover:bg-accent/10",
  danger: "text-danger hover:text-white hover:bg-danger/20 hover:border-danger",
};

export default function IconButton(props: Props) {
  const {
    children,
    label,
    size = "md",
    tone = "neutral",
    className = "",
    ...rest
  } = props;

  const classes = `inline-flex items-center justify-center rounded-md border border-border-soft bg-bg-elevated cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${SIZE[size]} ${TONE[tone]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AsLink;
    return (
      <Link
        href={href}
        className={classes}
        aria-label={label}
        title={label}
        {...anchorRest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      aria-label={label}
      title={label}
      {...(rest as AsButton)}
    >
      {children}
    </button>
  );
}
