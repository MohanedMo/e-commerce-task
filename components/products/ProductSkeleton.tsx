function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-slate-800/50 border border-white/5 animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-square bg-slate-700/50" />
      {/* Content placeholders */}
      <div className="p-4 space-y-3">
        <div className="h-2.5 w-16 bg-slate-700/50 rounded-full" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-full bg-slate-700/50 rounded-full" />
          <div className="h-3.5 w-3/4 bg-slate-700/50 rounded-full" />
        </div>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-3.5 h-3.5 bg-slate-700/50 rounded-full" />
          ))}
        </div>
        <div className="h-5 w-20 bg-slate-700/50 rounded-full pt-1" />
      </div>
    </div>
  );
}

/** Grid of skeleton cards for loading state */
export default function ProductSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
