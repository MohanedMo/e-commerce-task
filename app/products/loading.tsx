import ProductSkeleton from "@/components/products/ProductSkeleton";

export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-9 w-40 bg-slate-800/50 rounded-lg animate-pulse mb-2" />
        <div className="h-5 w-64 bg-slate-800/50 rounded-lg animate-pulse" />
      </div>

      {/* Search bar skeleton */}
      <div className="space-y-4 mb-8">
        <div className="h-12 max-w-xl bg-slate-800/50 rounded-xl animate-pulse" />
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-9 rounded-full bg-slate-800/50 animate-pulse shrink-0"
              style={{ width: `${60 + ((i * 13) % 41)}px` }}
            />
          ))}
        </div>
      </div>

      {/* Product grid skeleton */}
      <ProductSkeleton count={8} />
    </div>
  );
}
