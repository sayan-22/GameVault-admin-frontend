import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  icon?: ReactNode;
  size?: "sm" | "md";
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
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
};

export default function GhostButton(props: Props) {
  const { children, icon, size = "md", className = "", ...rest } = props;

  const classes = `inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium rounded-md border border-border-soft bg-bg-elevated text-text-secondary cursor-pointer transition-all duration-200 hover:text-text-primary hover:border-accent-border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-50 disabled:cursor-not-allowed ${SIZE[size]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AsLink;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as AsButton)}>
      {icon}
      {children}
    </button>
  );
}
