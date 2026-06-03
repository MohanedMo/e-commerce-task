"use client";

import React, { useState, useMemo } from "react";
import { useProducts, useSearchProducts, useCategories } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import SearchBar from "@/components/products/SearchBar";
import CategoryFilter from "@/components/products/CategoryFilter";
import type { Product } from "@/types";

const PRODUCTS_PER_PAGE = 12;

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
    refetch: refetchProducts,
  } = useProducts(skip, PRODUCTS_PER_PAGE, selectedCategory || undefined);

  const {
    data: searchData,
    isLoading: searchLoading,
  } = useSearchProducts(debouncedSearch);

  const isSearching = debouncedSearch.trim().length > 0;

  // Accumulate products when new data arrives or category changes.
  // selectedCategory is in deps so the effect re-runs even when
  // TanStack Query returns a cached (same-reference) result.
  React.useEffect(() => {
    if (productsData?.products && !isSearching) {
      // Defer state updates to a microtask to avoid synchronous setState calls within the effect body
      Promise.resolve().then(() => {
        if (skip === 0) {
          setLoadedProducts(productsData.products);
        } else {
          setLoadedProducts((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newProducts = productsData.products.filter((p) => !existingIds.has(p.id));
            return [...prev, ...newProducts];
          });
        }
        setHasInitialized(true);
      });
    }
  }, [productsData, skip, isSearching, selectedCategory]);

  const displayProducts = useMemo(() => {
    if (isSearching) {
      return searchData?.products || [];
    }
    return loadedProducts;
  }, [isSearching, searchData, loadedProducts]);

  const totalProducts = isSearching
    ? searchData?.total || 0
    : productsData?.total || 0;

  const canLoadMore = !isSearching && loadedProducts.length < totalProducts;

  const isInitialLoading = (!hasInitialized && productsLoading) || (isSearching && searchLoading);
  const isLoadingMore = hasInitialized && productsLoading && skip > 0;

  const handleLoadMore = () => {
    const newSkip = skip + PRODUCTS_PER_PAGE;
    setSkip(newSkip);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSkip(0);
    setLoadedProducts([]);
    setHasInitialized(false);
    setSearchQuery("");
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSelectedCategory("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Products Catalog
        </h1>
        <p className="text-slate-400">
          {isSearching
            ? `Found ${totalProducts} result${totalProducts !== 1 ? "s" : ""} for "${debouncedSearch}"`
            : `Explore our collection of ${totalProducts}+ products`}
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4 mb-8">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products by name or description..."
        />

        <CategoryFilter
          categories={categoriesData || []}
          selectedCategory={selectedCategory}
          onSelect={handleCategoryChange}
          isLoading={categoriesLoading}
        />
      </div>

      {/* Error State */}
      {productsError && !isSearching && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Something went wrong
          </h3>
          <p className="text-slate-400 mb-4 text-sm">
            Failed to load products. Please try again.
          </p>
          <button
            onClick={() => refetchProducts()}
            className="px-6 py-2.5 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {isInitialLoading && <ProductSkeleton count={PRODUCTS_PER_PAGE} />}

      {/* Product Grid */}
      {!isInitialLoading && !productsError && (
        <>
          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${(index % PRODUCTS_PER_PAGE) * 0.05}s`, animationFillMode: "forwards" }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No products found
              </h3>
              <p className="text-slate-400 text-sm">
                {isSearching
                  ? "Try adjusting your search term"
                  : "No products available in this category"}
              </p>
            </div>
          )}

          {/* Load More Button */}
          {canLoadMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="group px-8 py-3 rounded-xl bg-slate-800/80 border border-white/10 text-white font-medium hover:border-purple-500/30 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                {isLoadingMore ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    Load More Products
                    <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Product Count */}
          {!isSearching && loadedProducts.length > 0 && (
            <p className="text-center text-sm text-slate-500 mt-6">
              Showing {loadedProducts.length} of {totalProducts} products
            </p>
          )}
        </>
      )}
    </div>
  );
}
