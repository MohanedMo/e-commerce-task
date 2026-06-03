import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/products/ImageGallery";
import { MOCK_PRODUCTS } from "../mockData";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

// --- Star Rating Component ---
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= Math.round(rating) ? "text-amber-400" : "text-slate-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-slate-400 ml-1">
        {rating.toFixed(1)} ({Math.floor(rating * 20)} reviews)
      </span>
    </div>
  );
}

// --- Detail Item Helper ---
function DetailItem({
  label,
  value,
  valueClassName = "text-slate-300",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className={`text-sm font-medium capitalize ${valueClassName}`}>
        {value}
      </p>
    </div>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    notFound();
  }

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Back Button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
      >
        <svg
          className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image Gallery */}
        <ImageGallery
          images={product.images}
          thumbnail={product.thumbnail}
          title={product.title}
          discountPercentage={product.discountPercentage}
        />

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category */}
          <span className="inline-block text-xs uppercase tracking-widest text-purple-400 font-semibold bg-purple-500/10 px-3 py-1 rounded-full">
            {product.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            {product.title}
          </h1>

          {/* Brand */}
          {product.brand && (
            <p className="text-sm text-slate-400">
              by{" "}
              <span className="text-slate-300 font-medium">
                {product.brand}
              </span>
            </p>
          )}

          {/* Rating */}
          <StarRating rating={product.rating} />

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-white">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 5 && (
              <span className="text-lg text-slate-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-white/5">
            <h2 className="text-lg font-semibold text-white mb-2">
              Description
            </h2>
            <p className="text-slate-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Product Details Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <DetailItem label="Category" value={product.category} />
            {product.brand && (
              <DetailItem label="Brand" value={product.brand} />
            )}
            <DetailItem label="SKU" value={product.sku} />
            <DetailItem
              label="Availability"
              value={product.availabilityStatus}
              valueClassName={
                product.availabilityStatus === "In Stock"
                  ? "text-green-400"
                  : "text-amber-400"
              }
            />
            <DetailItem label="Stock" value={`${product.stock} units`} />
            <DetailItem label="Weight" value={`${product.weight}g`} />
            <DetailItem
              label="Min. Order"
              value={`${product.minimumOrderQuantity} units`}
            />
            <DetailItem label="Warranty" value={product.warrantyInformation} />
            <DetailItem label="Shipping" value={product.shippingInformation} />
            <DetailItem label="Return Policy" value={product.returnPolicy} />
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="pt-4 border-t border-white/5">
              <h2 className="text-sm font-semibold text-white mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-slate-800/80 border border-white/5 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {product.reviews.length > 0 && (
            <div className="pt-4 border-t border-white/5">
              <h2 className="text-lg font-semibold text-white mb-4">
                Reviews ({product.reviews.length})
              </h2>
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-slate-800/30 border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">
                        {review.reviewerName}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= review.rating
                                ? "text-amber-400"
                                : "text-slate-600"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-400">{review.comment}</p>
                    <p className="text-xs text-slate-500 mt-2">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
