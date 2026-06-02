"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  thumbnail: string;
  title: string;
  discountPercentage: number;
}

export default function ImageGallery({
  images,
  thumbnail,
  title,
  discountPercentage,
}: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0] || thumbnail);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-800/50 border border-white/5">
        <Image
          src={mainImage}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-300"
          priority
        />
        {/* Discount Badge */}
        {discountPercentage > 5 && (
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-linear-to-r from-rose-500 to-pink-500 text-white text-sm font-bold shadow-lg">
            -{Math.round(discountPercentage)}% OFF
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setMainImage(img)}
              className={`relative aspect-square rounded-xl overflow-hidden bg-slate-800/50 border transition-all cursor-pointer ${
                mainImage === img
                  ? "border-purple-500 shadow-lg shadow-purple-500/20"
                  : "border-white/5 hover:border-purple-500/30"
              }`}
            >
              <Image
                src={img}
                alt={`${title} - Image ${index + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
