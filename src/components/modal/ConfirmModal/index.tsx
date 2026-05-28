"use client";

import type { ReactNode } from "react";
import Modal from "@/src/components/modal/Modal";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import GhostButton from "@/src/components/buttons/GhostButton";

type Tone = "danger" | "default";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: Tone;
  loading?: boolean;
  icon?: ReactNode;
};

function ToneIcon({ tone }: { tone: Tone }) {
  if (tone === "danger") {
    return (
      <div className="grid h-12 w-12 place-items-center rounded-full bg-danger/15 text-danger">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
    );
  }
  return (
    <div className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-accent">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
  );
}

const DANGER_CLASSES =
  "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-danger px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(255,90,95,0.25)] transition-all duration-200 hover:bg-danger-soft hover:shadow-[0_12px_32px_rgba(255,90,95,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-danger/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] disabled:opacity-50 disabled:cursor-not-allowed";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  loading = false,
  icon,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={loading ? () => {} : onClose}
      title={title}
      description={description}
      size="sm"
      icon={icon ?? <ToneIcon tone={tone} />}
      footer={
        <>
          <GhostButton onClick={onClose} disabled={loading}>
            {cancelLabel}
          </GhostButton>
          {tone === "danger" ? (
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={DANGER_CLASSES}
            >
              {loading ? "Working…" : confirmLabel}
            </button>
          ) : (
            <PrimaryButton onClick={onConfirm} disabled={loading}>
              {loading ? "Working…" : confirmLabel}
            </PrimaryButton>
          )}
        </>
      }
    />
  );
}
