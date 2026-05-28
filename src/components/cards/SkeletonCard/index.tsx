export default function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border-card bg-bg-card p-4">
      <div className="skeleton h-40 w-full" />
      <div className="flex flex-col gap-2">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
      </div>
      <div className="flex items-end justify-between border-t border-border-soft pt-4">
        <div className="skeleton h-6 w-20" />
        <div className="skeleton h-8 w-16" />
      </div>
    </div>
  );
}

export function SkeletonStat() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border-card bg-bg-card p-6">
      <div className="skeleton h-3 w-24" />
      <div className="skeleton h-9 w-32" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="grid grid-cols-6 items-center gap-4 rounded-lg border border-border-soft bg-bg-card p-4">
      <div className="skeleton h-4 w-full col-span-2" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-8 w-full" />
    </div>
  );
}
