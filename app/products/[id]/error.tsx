"use client";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Something went wrong
        </h2>
        <p className="text-slate-400 max-w-md mb-8">
          {error.message || "We encountered an error while loading products. Please try again."}
        </p>

        <button
          onClick={reset}
          className="px-8 py-3 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
