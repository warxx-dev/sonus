'use server'

import { getPayload } from 'payload'
import type { Where } from 'payload'
import configPromise from '@payload-config'
import type { Product } from '@/src/payload-types'

export async function getProducts(options?: {
  category?: 'earphones' | 'speakers' | 'headphones'
  limit?: number
  page?: number
  sort?: string
  newOnly?: boolean
}) {
  const payload = await getPayload({ config: configPromise })

  const conditions: Where[] = []

  if (options?.category) {
    conditions.push({ category: { equals: options.category } })
  }

  if (options?.newOnly) {
    conditions.push({ new: { equals: true } })
  }

  const where: Where = conditions.length > 0 ? { and: conditions } : {}

  const result = await payload.find({
    collection: 'products',
    where,
    limit: options?.limit ?? 100,
    page: options?.page ?? 1,
    sort: options?.sort ?? '-createdAt',
    depth: 1,
  })

  return result
}

export async function getProductById(id: number): Promise<Product | null> {
  const payload = await getPayload({ config: configPromise })

  try {
    const product = await payload.findByID({
      collection: 'products',
      id,
      depth: 1,
    })

    return product
  } catch {
    return null
  }
}

export async function getProductByName(name: string): Promise<Product | null> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    where: {
      name: { contains: name },
    },
    limit: 1,
    depth: 1,
  })

  return result.docs[0] ?? null
}

export async function searchProducts(query: string) {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    where: {
      or: [{ name: { contains: query } }, { description: { contains: query } }],
    },
    depth: 1,
  })

  return result
}

export async function getRelatedProducts(productId: number): Promise<Product[]> {
  const payload = await getPayload({ config: configPromise })

  const currentProduct = await getProductById(productId)

  if (!currentProduct?.category) {
    return []
  }

  const result = await payload.find({
    collection: 'products',
    limit: 1000,
    depth: 1,
  })

  const allProducts = result.docs as Product[]

  const shuffle = <T>(items: T[]): T[] => {
    const array = [...items]

    for (let index = array.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1))
      ;[array[index], array[randomIndex]] = [array[randomIndex], array[index]]
    }

    return array
  }

  const sameCategory = allProducts.filter(
    (product) => product.id !== currentProduct.id && product.category === currentProduct.category,
  )
  const selected = shuffle(sameCategory).slice(0, 3)

  if (selected.length === 3) {
    return selected
  }

  const selectedIds = new Set([currentProduct.id, ...selected.map((product) => product.id)])
  const remainingProducts = allProducts.filter((product) => !selectedIds.has(product.id))
  const randomFill = shuffle(remainingProducts).slice(0, 3 - selected.length)

  return [...selected, ...randomFill]
}
