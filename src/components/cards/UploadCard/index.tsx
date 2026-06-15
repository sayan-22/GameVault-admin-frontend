"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";

type Props = {
  label: string;
  accept: string;
  hint?: string;
  kind: "image" | "video";
  multiple?: boolean;
  size?: "sm" | "lg";
  // Show the preview inside a 3:4 portrait sub-container (centered) without
  // changing the outer box size — for cover art.
  portrait?: boolean;
  // Existing media URLs to seed as thumbnails (edit mode, multiple).
  initialUrls?: string[];
  // Single-file cards report selected File objects here.
  onFilesChange?: (files: File[]) => void;
  // Multiple cards report new Files + the existing URLs still kept.
  onMultiChange?: (files: File[], keptUrls: string[]) => void;
};

type Item = { url: string; name: string; file?: File; existing?: boolean };

export default function UploadCard({
  label,
  accept,
  hint,
  kind,
  multiple,
  size = "sm",
  portrait = false,
  initialUrls,
  onFilesChange,
  onMultiChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>(() =>
    (initialUrls ?? []).map((u) => ({
      url: u,
      name: u.split("/").pop() || "image",
      existing: true,
    }))
  );
  const [dragOver, setDragOver] = useState(false);
  const onFilesChangeRef = useRef(onFilesChange);
  const onMultiChangeRef = useRef(onMultiChange);
  useEffect(() => {
    onFilesChangeRef.current = onFilesChange;
    onMultiChangeRef.current = onMultiChange;
  });

  function commit(next: Item[]) {
    setItems(next);
    if (multiple) {
      const files = next.filter((i) => i.file).map((i) => i.file as File);
      const kept = next.filter((i) => i.existing).map((i) => i.url);
      onMultiChangeRef.current?.(files, kept);
    } else {
      onFilesChangeRef.current?.(
        next.map((i) => i.file).filter((f): f is File => !!f)
      );
    }
  }

  function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const incoming: Item[] = Array.from(files).map((f) => ({
      url: URL.createObjectURL(f),
      name: f.name,
      file: f,
    }));
    if (multiple) {
      commit([...items, ...incoming]);
    } else {
      items.forEach((p) => p.file && URL.revokeObjectURL(p.url));
      commit(incoming.slice(0, 1));
    }
  }

  function remove(url: string) {
    const target = items.find((i) => i.url === url);
    if (target?.file) URL.revokeObjectURL(url);
    commit(items.filter((i) => i.url !== url));
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
      className={`flex flex-col gap-3 rounded-xl border border-dashed bg-bg-elevated/40 p-4 transition-colors ${
        dragOver ? "border-accent bg-accent/5" : "border-border-soft"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="font-display text-sm font-semibold text-text-primary">
            {label}
          </h3>
          {hint && (
            <p className="truncate text-[11px] text-text-muted">{hint}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="shrink-0 cursor-pointer rounded-md border border-accent-border bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent transition-colors hover:bg-accent/20"
        >
          {multiple ? "Add files" : "Choose"}
        </button>
      </div>

      {multiple && items.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {items.map((it) => (
            <Thumb
              key={it.url}
              item={it}
              kind={kind}
              onRemove={() => remove(it.url)}
            />
          ))}
        </div>
      ) : (
        <div
          className={`group relative grid w-full place-items-center overflow-hidden rounded-lg border border-border-soft bg-bg-base ${
            multiple ? "h-52" : "aspect-video"
          }`}
        >
          {!single && <Placeholder accept={accept} size={size} />}
          {single && portrait && (
            <div className="aspect-3/4 h-full overflow-hidden rounded-md">
              <Preview item={single} kind={kind} className="h-full w-full object-cover" />
            </div>
          )}
          {single && !portrait && (
            <Preview item={single} kind={kind} className="h-full w-full object-cover" />
          )}
          {single && <RemoveButton onClick={() => remove(single.url)} />}
        </div>
      )}

      {single && (
        <p className="truncate text-[11px] text-text-muted">
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

function Placeholder({
  accept,
  size = "sm",
}: {
  accept: string;
  size?: "sm" | "lg";
}) {
  const lg = size === "lg";
  return (
    <div
      className={`flex flex-col items-center text-center ${
        lg ? "gap-2.5 px-6 py-8" : "gap-1.5 px-4 py-4"
      }`}
    >
      <div
        className={`grid place-items-center rounded-full bg-accent/10 text-accent pulse-glow ${
          lg ? "h-14 w-14" : "h-9 w-9"
        }`}
      >
        <UploadIcon size={lg ? 28 : 20} />
      </div>
      <p
        className={`text-text-secondary ${lg ? "text-base font-medium" : "text-xs"}`}
      >
        Drag &amp; drop or click
      </p>
      <p className={`text-text-muted ${lg ? "text-xs" : "text-[10px]"}`}>
        {accept}
      </p>
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
    return (
      <video
        src={item.url}
        autoPlay
        muted
        loop
        playsInline
        className={className}
      />
    );
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
      <RemoveButton onClick={onRemove} />
    </div>
  );
}

// Cross button shown on hover over a preview (single or thumbnail). The parent
// must be `group relative`.
function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Remove file"
      className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-md bg-bg-base/80 text-text-secondary opacity-0 transition-opacity hover:text-danger group-hover:opacity-100"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}

function UploadIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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
