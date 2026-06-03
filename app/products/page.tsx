"use client";

import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import SearchBar from "@/components/products/SearchBar";
import CategoryFilter from "@/components/products/CategoryFilter";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "./mockData";
import type { Product } from "@/types";

const INITIAL_PRODUCTS_PER_PAGE = 4;
const LOAD_MORE_INCREMENT = 4;

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_PRODUCTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Simulate initial load for polished UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) || 
        product.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Paginated visible products
  const displayProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const canLoadMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate loading delay for skeleton spinner
    setTimeout(() => {
      setVisibleCount((prev) => prev + LOAD_MORE_INCREMENT);
      setIsLoadingMore(false);
    }, 800);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_PRODUCTS_PER_PAGE);
    setSearchQuery("");
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSelectedCategory("");
    }
    setVisibleCount(INITIAL_PRODUCTS_PER_PAGE);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Products Catalog
        </h1>
        <p className="text-slate-400">
          {searchQuery
            ? `Found ${filteredProducts.length} result${filteredProducts.length !== 1 ? "s" : ""} for "${searchQuery}"`
            : `Explore our collection of ${MOCK_PRODUCTS.length}+ products`}
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
          categories={MOCK_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelect={handleCategoryChange}
          isLoading={false}
        />
      </div>

      {/* Loading State */}
      {isInitialLoading ? (
        <ProductSkeleton count={INITIAL_PRODUCTS_PER_PAGE} />
      ) : (
        <>
          {/* Product Grid */}
          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${(index % INITIAL_PRODUCTS_PER_PAGE) * 0.05}s`, animationFillMode: "forwards" }}
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
                {searchQuery
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
          {filteredProducts.length > 0 && (
            <p className="text-center text-sm text-slate-500 mt-6">
              Showing {displayProducts.length} of {filteredProducts.length} products
            </p>
          )}
        </>
      )}
    </div>
  );
}
