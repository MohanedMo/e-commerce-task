"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

/** Render star rating icons */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating)
              ? "text-amber-400"
              : "text-slate-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-slate-400 ml-1">({rating.toFixed(1)})</span>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative rounded-2xl overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
        {/* Discount Badge */}
        {product.discountPercentage > 5 && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-linear-to-r from-rose-500 to-pink-500 text-white text-xs font-bold shadow-lg">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-slate-900/50">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          {/* Hover overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-purple-400 font-semibold">
            {product.category}
          </span>

          <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-purple-300 transition-colors leading-snug">
            {product.title}
          </h3>

          <StarRating rating={product.rating} />

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-bold text-white">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 5 && (
              <span className="text-xs text-slate-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
