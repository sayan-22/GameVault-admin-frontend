import { AlertCircle } from "lucide-react";

// Inline error banner for forms. Renders nothing when there's no message.
export default function FormError({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-md border border-danger/30 bg-danger/10 px-3.5 py-2.5 text-sm text-danger"
    >
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
