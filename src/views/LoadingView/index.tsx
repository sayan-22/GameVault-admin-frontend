import Container from "@/src/components/layout/Container";
import {
  SkeletonStat,
  default as SkeletonCard,
} from "@/src/components/cards/SkeletonCard";

export default function LoadingView() {
  return (
    <Container className="py-10">
      <div className="flex flex-col gap-3 pb-8">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-10 w-72" />
        <div className="skeleton h-4 w-96" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonStat key={i} />
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </Container>
  );
}
