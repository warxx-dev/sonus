'use client'

import { Media, Product } from '@/src/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useHydration } from '@/lib/hooks/use-store'
import { useFavoritesStore } from '@/lib/store/favorites-store'
import { Heart } from 'lucide-react'

export const ProductCard = ({ product }: { product: Product }) => {
  const [loading, setLoading] = useState(false)
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  const isHydrated = useHydration()
  const isProductFavorite = isHydrated ? isFavorite(product.id) : false

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
    <div className="group flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-lg">
      {/* Product Image */}
      <div className="relative h-70 overflow-hidden bg-zinc-100">
        <Image
          src={typeof product.image === 'object' ? ((product.image as Media).url ?? '') : ''}
          alt={product.name}
          fill
          className="object-contain p-8 transition-transform group-hover:scale-105"
        />
        {product.new && (
          <span className="absolute left-4 top-4 rounded-full bg-orange-600 px-3 py-1 text-xs font-bold uppercase text-white">
            New
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg flex-1 font-bold uppercase text-black">{product.name}</h3>
        <p className="mb-4 line-clamp-3 text-sm text-zinc-600">{product.description}</p>
        <p className="mb-4 text-lg font-bold text-black">
          ${product.price.toLocaleString('en-US')}
        </p>
        <div className="flex items-center gap-4">
          <Link href={`/products/${product.id}`} className="w-full">
            <Button
              size="lg"
              disabled={loading}
              className="w-full text-sm font-bold uppercase tracking-wider"
              onClick={() => setLoading(true)}
            >
              {loading ? 'LOADING...' : 'SEE PRODUCT'}
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={handleToggleFavorite}
            className={`p-4 ${
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
