import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { ProductsResponse } from "@/types";

const PRODUCTS_PER_PAGE = 12;

export function useInfiniteProducts(category?: string) {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ["products", "infinite", { category }],
    queryFn: async ({ pageParam }) => {
      const skip = pageParam as number;
      const url = category
        ? `/products/category/${category}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
        : `/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
      const { data } = await api.get<ProductsResponse>(url);
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
  });
}
