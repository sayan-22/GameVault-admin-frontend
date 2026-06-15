"use client";

import type { ReactNode } from "react";
import Modal from "@/src/components/modal/Modal";
import CommonButton from "@/src/components/buttons/CommonButton";
import OutlineButton from "@/src/components/buttons/OutlineButton";

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
          <OutlineButton
            text={cancelLabel}
            onClick={onClose}
            disabled={loading}
            className="h-11 w-fit rounded-lg bg-bg-elevated px-5 text-sm"
          />
          <CommonButton
            text={loading ? "Working…" : confirmLabel}
            onClick={onConfirm}
            disabled={loading}
            variant={tone === "danger" ? "danger" : "theme"}
            className="h-11 w-fit px-5 text-sm"
          />
        </>
      }
    />
  );
}
