"use client";

import type { ReactNode } from "react";
import { AlertTriangle, Info } from "lucide-react";
import Modal from "@/src/components/modal/Modal";
import { CommonButton, OutlineButton } from "@/src/components/buttons";

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
        <AlertTriangle size={22} />
      </div>
    );
  }
  return (
    <div className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-accent">
      <Info size={22} />
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
