import Link from "next/link";

export default function ProductsNotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-7xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 animate-gradient">
          404
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-slate-400 max-w-md mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/products"
          className="px-8 py-3 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </Link>
      </div>
    </div>
  );
}
