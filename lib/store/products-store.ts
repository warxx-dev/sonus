import { create } from "zustand";
import { Product } from "@/lib/types";

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    // Si ya tenemos productos, no volver a cargarlos
    if (get().products.length > 0) return;

    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/data/products.json");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      set({ products: data.products, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        isLoading: false,
      });
    }
  },

  getProductBySlug: (slug: string) => {
    return get().products.find((product) => product.slug === slug);
  },

  getProductsByCategory: (category: string) => {
    return get().products.filter((product) => product.category === category);
  },
}));
