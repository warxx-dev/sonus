'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Product, Media } from '@/src/payload-types'

export interface CartProduct {
  id: number
  name: string
  price: number
  image: string | null
}

function serializeForCart(product: Product): CartProduct {
  const image = typeof product.image === 'object' ? ((product.image as Media).url ?? null) : null

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image,
  }
}

export async function addToCart(
  productId: number,
  quantity: number = 1,
): Promise<{
  success: boolean
  product: CartProduct | null
  quantity: number
  error?: string
}> {
  if (quantity < 1 || !Number.isInteger(quantity)) {
    return {
      success: false,
      product: null,
      quantity: 0,
      error: 'La cantidad debe ser un número entero mayor a 0',
    }
  }

  const payload = await getPayload({ config: configPromise })

  try {
    const product = await payload.findByID({
      collection: 'products',
      id: productId,
      depth: 1,
    })

    return {
      success: true,
      product: serializeForCart(product),
      quantity,
    }
  } catch {
    return {
      success: false,
      product: null,
      quantity: 0,
      error: 'Producto no encontrado',
    }
  }
}

export async function validateCartItems(items: { productId: number; quantity: number }[]): Promise<{
  validItems: (CartProduct & { quantity: number })[]
  invalidIds: number[]
}> {
  const payload = await getPayload({ config: configPromise })

  const productIds = items.map((item) => item.productId)

  const result = await payload.find({
    collection: 'products',
    where: {
      id: { in: productIds },
    },
    depth: 1,
    limit: productIds.length,
  })

  const foundIds = new Set(result.docs.map((doc) => doc.id))
  const invalidIds = productIds.filter((id) => !foundIds.has(id))

  const quantityMap = new Map(items.map((item) => [item.productId, item.quantity]))

  const validItems = result.docs.map((product) => ({
    ...serializeForCart(product),
    quantity: quantityMap.get(product.id) ?? 1,
  }))

  return { validItems, invalidIds }
}
