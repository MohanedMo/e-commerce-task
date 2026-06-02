"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search products...",
}: SearchBarProps) {
  return (
    <div className="relative group w-full max-w-xl">
      <div className="absolute -inset-0.5 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300" />

      <div className="relative flex items-center">
        <svg
          className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3 rounded-xl bg-slate-800/80 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all text-sm"
          id="product-search-input"
        />

        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all cursor-pointer"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
