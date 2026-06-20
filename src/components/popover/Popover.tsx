"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type TriggerArgs = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

type PanelArgs = {
  close: () => void;
};

type Align = "left" | "right";

type Props = {
  trigger: (args: TriggerArgs) => ReactNode;
  children: (args: PanelArgs) => ReactNode;
  align?: Align;
  width?: string;
  className?: string;
  panelClassName?: string;
};

export default function Popover({
  trigger,
  children,
  align = "right",
  width = "w-60",
  className = "",
  panelClassName = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    function onMouseDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const alignClasses =
    align === "right"
      ? "right-0 origin-top-right"
      : "left-0 origin-top-left";

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {trigger({ open, toggle, close })}

      {open && (
        <div
          role="menu"
          className={`popover-panel absolute top-12 z-50 overflow-hidden rounded-xl border border-border-card bg-bg-card shadow-lift ring-1 ring-black/40 ${alignClasses} ${width} ${panelClassName}`}
        >
          {children({ close })}
        </div>
      )}
    </div>
  );
}
