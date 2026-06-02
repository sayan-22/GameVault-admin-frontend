export type NavLink = {
  label: string;
  href: string;
};

export const PUBLIC_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Browse", href: "/browse" },
];

export const ADMIN_NAV_LINKS: NavLink[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Games", href: "/admin/games" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Prices", href: "/admin/prices" },
];
