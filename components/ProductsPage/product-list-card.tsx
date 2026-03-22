'use client'

import type { Product, Media } from '@/src/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { useFavoritesStore } from '@/lib/store/favorites-store'
import { useHydration } from '@/lib/hooks/use-store'
import { useState } from 'react'

export const ProductListCard = ({ product, index }: { product: Product; index: number }) => {
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  const isHydrated = useHydration()
  const isProductFavorite = isHydrated ? isFavorite(product.id) : false
  const [loading, setLoading] = useState(false)

  const imageUrl = typeof product.image === 'object' ? ((product.image as Media).url ?? '') : ''

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageUrl,
      category: product.category,
    })
  }

  return (
    <div
      key={product.id}
      className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${
        index % 2 === 1 ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Product Image */}
      <div
        className={`relative h-100 overflow-hidden rounded-lg bg-zinc-100 lg:h-140 ${
          index % 2 === 1 ? 'lg:order-2' : ''
        }`}
      >
        <Image src={imageUrl} alt={product.name} fill className="object-contain p-12" />
      </div>

      {/* Product Info */}
      <div
        className={`flex flex-col justify-center space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
      >
        {product.new && (
          <p className="text-sm font-medium uppercase tracking-[0.5em] text-orange-600">
            NEW PRODUCT
          </p>
        )}
        <h2 className="text-4xl font-bold uppercase leading-tight tracking-wide text-black lg:text-5xl">
          {product.name}
        </h2>
        <p className="text-base leading-relaxed text-zinc-600">{product.description}</p>
        <p className="text-lg font-bold text-black">${product.price.toLocaleString('en-US')}</p>
        <div className="flex items-center gap-4">
          <Link href={`/products/${product.id}`}>
            <Button
              disabled={loading}
              size="lg"
              className="px-8 py-6 text-sm font-bold uppercase tracking-wider"
              onClick={() => {
                setLoading(true)
              }}
            >
              {loading ? 'LOADING...' : 'SEE PRODUCT'}
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={handleToggleFavorite}
            className={`px-4 py-6 ${
              isProductFavorite
                ? 'border-orange-600 bg-orange-50 text-orange-600'
                : 'border-zinc-300 text-zinc-600 hover:border-orange-600'
            }`}
          >
            <Heart className={`h-5 w-5 ${isProductFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  )
}
