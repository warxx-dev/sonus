import { create } from 'zustand'
import type { Product } from '@/src/payload-types'
import { getProducts } from '@/src/app/actions'

interface ProductsState {
  products: Product[]
  isLoading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  getProductById: (id: number) => Product | undefined
  getProductsByCategory: (category: string) => Product[]
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    if (get().products.length > 0) return

    set({ isLoading: true, error: null })
    try {
      const result = await getProducts({ limit: 100 })
      set({ products: result.docs, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      })
    }
  },

  getProductById: (id: number) => {
    return get().products.find((product) => product.id === id)
  },

  getProductsByCategory: (category: string) => {
    return get().products.filter((product) => product.category === category)
  },
}))
