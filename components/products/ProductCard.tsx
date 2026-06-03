"use client";

import Link from "next/link";
import Image from "next/image";
import StarRating from "@/components/ui/StarRating";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority }: ProductCardProps) {
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
            priority={priority}
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

          <StarRating rating={product.rating} size="sm" />

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
