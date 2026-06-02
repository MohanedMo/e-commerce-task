"use client";

import { useRef } from "react";
import type { Category } from "@/types";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (category: string) => void;
  isLoading?: boolean;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
  isLoading = false,
}: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-9 rounded-full bg-slate-800/50 animate-pulse shrink-0"
            style={{ width: `${60 + Math.random() * 40}px` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* "All" pill */}
        <button
          onClick={() => onSelect("")}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
            selectedCategory === ""
              ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
              : "bg-slate-800/80 text-slate-300 border border-white/10 hover:border-purple-500/30 hover:text-white"
          }`}
        >
          All
        </button>

        {/* Category pills */}
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize cursor-pointer ${
              selectedCategory === cat.slug
                ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-slate-800/80 text-slate-300 border border-white/10 hover:border-purple-500/30 hover:text-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
