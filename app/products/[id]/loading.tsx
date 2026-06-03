export default function ProductDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in">
      {/* Back button skeleton */}
      <div className="h-5 w-32 bg-slate-800/50 rounded-lg animate-pulse mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image skeleton */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl bg-slate-800/50 animate-pulse" />
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-xl bg-slate-800/50 animate-pulse" />
            ))}
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          <div className="h-6 w-24 bg-slate-800/50 rounded-full animate-pulse" />
          <div className="space-y-2">
            <div className="h-8 w-3/4 bg-slate-800/50 rounded-lg animate-pulse" />
            <div className="h-8 w-1/2 bg-slate-800/50 rounded-lg animate-pulse" />
          </div>
          <div className="h-5 w-32 bg-slate-800/50 rounded-lg animate-pulse" />
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-5 h-5 bg-slate-800/50 rounded-full animate-pulse" />
            ))}
          </div>
          <div className="h-8 w-28 bg-slate-800/50 rounded-lg animate-pulse" />
          <div className="pt-4 border-t border-white/5 space-y-2">
            <div className="h-6 w-28 bg-slate-800/50 rounded-lg animate-pulse" />
            <div className="h-4 w-full bg-slate-800/50 rounded-lg animate-pulse" />
            <div className="h-4 w-4/5 bg-slate-800/50 rounded-lg animate-pulse" />
            <div className="h-4 w-3/5 bg-slate-800/50 rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-3 w-16 bg-slate-800/50 rounded animate-pulse" />
                <div className="h-4 w-24 bg-slate-800/50 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
