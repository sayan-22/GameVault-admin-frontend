"use client";

type Props = {
  checked: boolean;
  label: string;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
};

export default function SwitchToggleButton({
  checked,
  label,
  onCheckedChange,
  className = "",
  disabled = false,
}: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={`flex cursor-pointer items-center gap-2.5 text-xs font-medium text-text-secondary disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span>{label}</span>
      <span
        className={`relative h-6 w-11 flex-none overflow-hidden rounded-full transition-colors ${
          checked ? "bg-accent" : "border border-border-soft bg-bg-elevated"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}
