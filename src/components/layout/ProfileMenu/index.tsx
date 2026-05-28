"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import Popover from "@/src/components/popover/Popover";
import ConfirmModal from "@/src/components/modal/ConfirmModal";

type Item = {
  label: string;
  href?: string;
  tone?: "default" | "danger";
  onClick?: () => void;
  icon?: ReactNode;
};

const LINK_ITEMS: Item[] = [
  { label: "Sign in", href: "/signin", icon: <SignInIcon /> },
  { label: "Create account", href: "/signup", icon: <UserPlusIcon /> },
];

export default function ProfileMenu() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  function handleLogout() {
    setLoggingOut(true);
    setTimeout(() => {
      setLoggingOut(false);
      setConfirmOpen(false);
    }, 700);
  }

  return (
    <>
      <Popover
        align="right"
        width="w-60"
        trigger={({ open, toggle }) => (
          <button
            type="button"
            aria-label="Profile menu"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={toggle}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-accent-border bg-linear-to-br from-bg-card to-bg-base text-accent transition-shadow hover:shadow-[0_0_0_2px_rgba(0,217,255,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <UserIcon />
          </button>
        )}
      >
        {({ close }) => (
          <>
            <div className="border-b border-border-soft px-4 py-3">
              <p className="font-display text-sm font-semibold text-text-primary">
                Guest
              </p>
              <p className="text-xs text-text-muted">Not signed in</p>
            </div>

            <ul className="flex flex-col py-1.5">
              {LINK_ITEMS.map((item) => (
                <li key={item.label}>
                  <MenuRow item={item} onSelect={close} />
                </li>
              ))}
              <li>
                <MenuRow
                  item={{
                    label: "Log out",
                    tone: "danger",
                    icon: <LogOutIcon />,
                    onClick: () => {
                      close();
                      setConfirmOpen(true);
                    },
                  }}
                  onSelect={() => {}}
                />
              </li>
            </ul>
          </>
        )}
      </Popover>

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleLogout}
        loading={loggingOut}
        tone="danger"
        title="Log out of GameVault?"
        description="You'll be signed out of the admin panel and returned to the home page."
        confirmLabel="Yes, log out"
        cancelLabel="No, stay signed in"
      />
    </>
  );
}

function MenuRow({ item, onSelect }: { item: Item; onSelect: () => void }) {
  const tone =
    item.tone === "danger"
      ? "text-danger hover:bg-danger/10"
      : "text-text-secondary hover:text-text-primary hover:bg-accent/5";

  const className = `flex items-center gap-3 px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors ${tone}`;

  if (item.href) {
    return (
      <Link
        href={item.href}
        role="menuitem"
        onClick={onSelect}
        className={className}
      >
        <span className="text-text-muted">{item.icon}</span>
        {item.label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      role="menuitem"
      onClick={() => {
        item.onClick?.();
        onSelect();
      }}
      className={`w-full text-left ${className}`}
    >
      <span
        className={item.tone === "danger" ? "text-danger" : "text-text-muted"}
      >
        {item.icon}
      </span>
      {item.label}
    </button>
  );
}

function UserIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SignInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
