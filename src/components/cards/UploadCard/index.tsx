"use client";

import { useRef, useState, type ChangeEvent } from "react";

type Props = {
  label: string;
  accept: string;
  hint?: string;
  kind: "image" | "video";
  multiple?: boolean;
};

type Item = { url: string; name: string };

export default function UploadCard({ label, accept, hint, kind, multiple }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [dragOver, setDragOver] = useState(false);

  function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const next = Array.from(files).map((f) => ({
      url: URL.createObjectURL(f),
      name: f.name,
    }));
    setItems((prev) => {
      if (!multiple) {
        prev.forEach((p) => URL.revokeObjectURL(p.url));
        return next.slice(0, 1);
      }
      return [...prev, ...next];
    });
  }

  function remove(url: string) {
    URL.revokeObjectURL(url);
    setItems((prev) => prev.filter((i) => i.url !== url));
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    addFiles(e.target.files);
    e.target.value = "";
  }

  const single = !multiple ? items[0] : undefined;

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
        addFiles(e.dataTransfer.files);
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
          {multiple ? "Add files" : "Choose file"}
        </button>
      </div>

      {multiple && items.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((it) => (
            <Thumb key={it.url} item={it} kind={kind} onRemove={() => remove(it.url)} />
          ))}
        </div>
      ) : (
        <div className="relative grid min-h-44 place-items-center overflow-hidden rounded-lg border border-border-soft bg-bg-base">
          {!single && <Placeholder accept={accept} />}
          {single && <Preview item={single} kind={kind} className="h-full max-h-72 w-full object-cover" />}
        </div>
      )}

      {single && (
        <p className="truncate text-xs text-text-muted">
          <span className="text-text-secondary">Selected:</span> {single.name}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
}

function Placeholder({ accept }: { accept: string }) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent pulse-glow">
        <UploadIcon />
      </div>
      <p className="text-sm text-text-secondary">Drag &amp; drop or click the button</p>
      <p className="text-xs text-text-muted">{accept}</p>
    </div>
  );
}

function Preview({
  item,
  kind,
  className,
}: {
  item: Item;
  kind: "image" | "video";
  className: string;
}) {
  if (kind === "video") {
    return <video src={item.url} autoPlay muted loop playsInline className={className} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={item.url} alt="preview" className={className} />;
}

function Thumb({
  item,
  kind,
  onRemove,
}: {
  item: Item;
  kind: "image" | "video";
  onRemove: () => void;
}) {
  return (
    <div className="group relative aspect-video overflow-hidden rounded-lg border border-border-soft bg-bg-base">
      <Preview item={item} kind={kind} className="h-full w-full object-cover" />
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove file"
        className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-md bg-bg-base/80 text-text-secondary opacity-0 transition-opacity hover:text-danger group-hover:opacity-100"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
