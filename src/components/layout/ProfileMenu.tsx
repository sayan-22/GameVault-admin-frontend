"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";
import { Popover } from "@/src/components/popover";
import { ConfirmModal } from "@/src/components/modal";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { logoutThunk } from "@/src/lib/store/slices/authSlice";

type Item = {
  label: string;
  href?: string;
  tone?: "default" | "danger";
  onClick?: () => void;
  icon?: ReactNode;
};

const SIGNED_OUT_ITEMS: Item[] = [
  { label: "Sign in", href: "/signin", icon: <LogIn size={16} /> },
  { label: "Create account", href: "/signup", icon: <UserPlus size={16} /> },
];

export default function ProfileMenu() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await dispatch(logoutThunk());
      setConfirmOpen(false);
      router.push("/signin");
    } finally {
      setLoggingOut(false);
    }
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
            <User size={18} />
          </button>
        )}
      >
        {({ close }) => (
          <>
            <div className="border-b border-border-soft px-4 py-3">
              <p className="font-display text-sm font-semibold text-text-primary">
                {user?.name ?? "Guest"}
              </p>
              <p className="truncate text-xs text-text-muted">
                {user?.email ?? "Not signed in"}
              </p>
            </div>

            <ul className="flex flex-col py-1.5">
              {!user &&
                SIGNED_OUT_ITEMS.map((item) => (
                  <li key={item.label}>
                    <MenuRow item={item} onSelect={close} />
                  </li>
                ))}
              {user && (
                <li>
                  <MenuRow
                    item={{
                      label: "Log out",
                      tone: "danger",
                      icon: <LogOut size={16} />,
                      onClick: () => {
                        close();
                        setConfirmOpen(true);
                      },
                    }}
                    onSelect={() => {}}
                  />
                </li>
              )}
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
