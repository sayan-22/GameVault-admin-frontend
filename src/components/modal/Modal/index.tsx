"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Size = "sm" | "md" | "lg";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: Size;
  closeOnBackdrop?: boolean;
};

const SIZES: Record<Size, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    prevFocus.current = document.activeElement as HTMLElement;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const items = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!items || items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      role="presentation"
      onClick={() => closeOnBackdrop && onClose()}
      className="modal-backdrop fixed inset-0 z-[100] grid place-items-center bg-black/65 p-4 backdrop-blur-sm"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={`modal-panel w-full ${SIZES[size]} flex flex-col gap-5 rounded-2xl border border-border-card bg-bg-card p-6 sm:p-7 shadow-lift`}
      >
        <header className="flex items-start gap-4">
          {icon && <div className="shrink-0">{icon}</div>}
          <div className="flex flex-col gap-1.5">
            <h2 className="font-display text-xl font-semibold tracking-tight text-text-primary">
              {title}
            </h2>
            {description && (
              <p className="text-sm leading-relaxed text-text-secondary">
                {description}
              </p>
            )}
          </div>
        </header>

        {children}

        {footer && (
          <footer className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body
  );
}
