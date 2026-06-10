import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
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
  lg: "h-12 px-6 text-base",
};

const VARIANT = {
  solid:
    "bg-accent text-[#001016] hover:bg-accent-glow shadow-[0_8px_24px_rgba(0,217,255,0.25)] hover:shadow-[0_12px_32px_rgba(0,217,255,0.45)]",
  outline:
    "bg-transparent text-accent border border-accent-border hover:border-accent hover:bg-accent/10",
};

export default function PrimaryButton(props: Props) {
  const {
    children,
    icon,
    size = "md",
    variant = "solid",
    className = "",
    ...rest
  } = props;

  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-wide rounded-md cursor-pointer transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] disabled:opacity-50 disabled:cursor-not-allowed";

  const classes = `${base} ${SIZE[size]} ${VARIANT[variant]} ${className}`;

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
