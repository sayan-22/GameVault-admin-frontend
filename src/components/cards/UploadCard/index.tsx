"use client";

import { useRef, useState, type ChangeEvent } from "react";

type Props = {
  label: string;
  accept: string;
  hint?: string;
  kind: "image" | "video";
};

export default function UploadCard({ label, accept, hint, kind }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFile(file: File | null) {
    if (!file) return;
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    handleFile(e.target.files?.[0] ?? null);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files?.[0] ?? null);
      }}
      className={`flex flex-col gap-4 rounded-xl border-2 border-dashed bg-bg-card p-6 transition-colors ${
        dragOver ? "border-accent bg-accent/5" : "border-border-card"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-base font-semibold text-text-primary">
            {label}
          </h3>
          {hint && <p className="text-xs text-text-muted">{hint}</p>}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer rounded-md border border-accent-border bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/20"
        >
          Choose file
        </button>
      </div>

      <div className="relative grid min-h-44 place-items-center overflow-hidden rounded-lg border border-border-soft bg-bg-base">
        {!preview && (
          <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent pulse-glow">
              <UploadIcon />
            </div>
            <p className="text-sm text-text-secondary">
              Drag &amp; drop or click "Choose file"
            </p>
            <p className="text-xs text-text-muted">{accept}</p>
          </div>
        )}

        {preview && kind === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="preview"
            className="h-full max-h-72 w-full object-cover"
          />
        )}

        {preview && kind === "video" && (
          <video
            ref={videoRef}
            src={preview}
            autoPlay
            muted
            loop
            playsInline
            className="h-full max-h-72 w-full object-cover"
          />
        )}
      </div>

      {fileName && (
        <p className="truncate text-xs text-text-muted">
          <span className="text-text-secondary">Selected:</span> {fileName}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
}

function UploadIcon() {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
