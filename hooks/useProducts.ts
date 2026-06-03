import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { ProductsResponse, Category } from "@/types";

const PRODUCTS_PER_PAGE = 12;

export function useProducts(
  skip: number = 0,
  limit: number = PRODUCTS_PER_PAGE,
  category?: string
) {
  return useQuery<ProductsResponse>({
    queryKey: ["products", { skip, limit, category }],
    queryFn: async () => {
      // Use category-specific endpoint if filter is active
      const url = category
        ? `/products/category/${category}?limit=${limit}&skip=${skip}`
        : `/products?limit=${limit}&skip=${skip}`;

      const { data } = await api.get<ProductsResponse>(url);
      return data;
    },
  });
}

export function useSearchProducts(query: string) {
  return useQuery<ProductsResponse>({
    queryKey: ["products", "search", query],
    queryFn: async () => {
      const { data } = await api.get<ProductsResponse>(
        `/products/search?q=${encodeURIComponent(query)}`
      );
      return data;
    },
    // Only run query when search term is not empty
    enabled: query.trim().length > 0,
  });
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get<Category[]>("/products/categories");
      return data;
    },
    // Categories change rarely, cache for longer
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}
