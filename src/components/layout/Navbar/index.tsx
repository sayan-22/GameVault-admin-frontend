"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ADMIN_NAV_LINKS,
  PUBLIC_NAV_LINKS,
  type NavLink as NavLinkItem,
} from "@/src/constants/nav";
import ProfileMenu from "@/src/components/layout/ProfileMenu";

function getLinks(pathname: string): NavLinkItem[] {
  return pathname.startsWith("/admin") ? ADMIN_NAV_LINKS : PUBLIC_NAV_LINKS;
}

function isActive(linkHref: string, pathname: string) {
  return linkHref === "/admin"
    ? pathname === "/admin"
    : pathname === linkHref || pathname.startsWith(`${linkHref}/`);
}

function Logo() {
  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center gap-2.5 font-display text-lg font-bold tracking-tight text-text-primary"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-lg border border-accent-border bg-bg-elevated">
        <span className="absolute inset-0 rounded-lg bg-accent/10 opacity-60 transition-opacity group-hover:opacity-100" />
        <span className="relative font-mono text-base font-black text-accent">
          GV
        </span>
      </span>
      <span className="hidden sm:inline">
        Game<span className="text-accent">Vault</span>
      </span>
    </Link>
  );
}

function NavLinks({ pathname }: { pathname: string }) {
  return (
    <nav className="hidden items-center gap-1 md:flex">
      {getLinks(pathname).map((link) => {
        const active = isActive(link.href, pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
              active
                ? "text-text-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {link.label}
            {active && (
              <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent shadow-[0_0_12px_rgba(0,217,255,0.6)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function HamburgerButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={open}
      onClick={onToggle}
      className="grid h-10 w-10 cursor-pointer place-items-center rounded-md border border-border-soft bg-bg-elevated text-text-primary transition-colors hover:border-accent-border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:hidden"
    >
      {open ? <XIcon /> : <BarsIcon />}
    </button>
  );
}

function MobileMenu({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  return (
    <div className="border-t border-border-soft bg-bg-nav/95 backdrop-blur-md md:hidden">
      <ul className="mx-auto flex w-full max-w-7xl flex-col py-2">
        {getLinks(pathname).map((link) => {
          const active = isActive(link.href, pathname);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className={`flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium transition-colors sm:px-6 ${
                  active
                    ? "border-l-2 border-accent bg-accent/10 text-text-primary"
                    : "text-text-secondary hover:bg-bg-elevated/50 hover:text-text-primary"
                }`}
              >
                {link.label}
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,217,255,0.6)]" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  // Close the mobile menu on navigation — adjust state during render rather
  // than in an effect (React's recommended pattern for prop-driven resets).
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-bg-nav/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-10">
        <Logo />
        <NavLinks pathname={pathname} />
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <ProfileMenu />
          <HamburgerButton
            open={mobileOpen}
            onToggle={() => setMobileOpen((v) => !v)}
          />
        </div>
      </div>
      {mobileOpen && (
        <MobileMenu
          pathname={pathname}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
}

function BarsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
