'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Product, Media } from '@/src/payload-types'

export interface FavoriteProduct {
  id: number
  name: string
  price: number
  category: Product['category']
  image: string | null
}

function serializeForFavorite(product: Product): FavoriteProduct {
  const image = typeof product.image === 'object' ? ((product.image as Media).url ?? null) : null

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    image,
  }
}

export async function addFavorite(
  productId: number,
): Promise<{ success: boolean; product: FavoriteProduct | null; error?: string }> {
  const payload = await getPayload({ config: configPromise })

  try {
    const product = await payload.findByID({
      collection: 'products',
      id: productId,
      depth: 1,
    })

    return {
      success: true,
      product: serializeForFavorite(product),
    }
  } catch {
    return {
      success: false,
      product: null,
      error: 'Producto no encontrado',
    }
  }
}

export async function toggleFavorite(
  productId: number,
): Promise<{ success: boolean; product: FavoriteProduct | null; error?: string }> {
  return addFavorite(productId)
}

/**
 * Valida múltiples productos por sus IDs y devuelve los que existen.
 * Útil para sincronizar favoritos del localStorage con el estado real del CMS.
 */
export async function validateFavorites(
  productIds: number[],
): Promise<{ validProducts: FavoriteProduct[] }> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    where: {
      id: { in: productIds },
    },
    depth: 1,
    limit: productIds.length,
  })

  return {
    validProducts: result.docs.map(serializeForFavorite),
  }
}
