'use client'

import { useFavoritesStore } from '@/lib/store/favorites-store'
import { useCartStore } from '@/lib/store/cart-store'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, Heart, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function FavoritesPage() {
  const { items, removeItem } = useFavoritesStore()
  const { addItem } = useCartStore()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = (item: (typeof items)[0]) => {
    toast.success(`Added to cart: ${item.name}`, {
      description: `1 unit(s) added.`,
    })
    setIsAdded(true)
    addItem(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      },
      1,
    )
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-8 py-20 text-center">
          <Heart className="h-24 w-24 text-zinc-300" />
          <div className="space-y-4">
            <h1 className="text-3xl font-bold uppercase tracking-wide text-black lg:text-4xl">
              No Favorites Yet
            </h1>
            <p className="text-lg text-zinc-600">
              Start adding products to your favorites to see them here.
            </p>
          </div>
          <Link href="/products">
            <Button size="lg" className="px-8 py-6 text-sm font-bold uppercase tracking-wider">
              Browse Products
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-16 lg:px-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold uppercase tracking-wide text-black lg:text-4xl">
            My Favorites
          </h1>
          <p className="text-lg text-zinc-600">
            {items.length} {items.length === 1 ? 'product' : 'products'} in your favorites
          </p>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-lg"
            >
              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-zinc-600 shadow-md transition-colors hover:bg-red-50 hover:text-red-600"
                aria-label="Remove from favorites"
              >
                <Trash2 className="h-5 w-5" />
              </button>

              {/* Product Image */}
              <Link href={`/products/${item.id}`} className="relative h-64 w-full bg-zinc-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-8 transition-transform group-hover:scale-105"
                />
              </Link>

              {/* Product Info */}
              <div className="flex flex-col space-y-4 p-6">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    {item.category}
                  </p>
                  <Link href={`/products/${item.id}`}>
                    <h3 className="text-xl font-bold uppercase leading-tight text-black transition-colors hover:text-orange-600">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-lg font-bold text-black">
                    ${item.price.toLocaleString('en-US')}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className={`flex-1 gap-2 text-sm font-bold uppercase tracking-wider ${
                      isAdded
                        ? 'bg-green-600 hover:bg-green-700 pointer-events-none'
                        : 'bg-orange-600 hover:bg-orange-700'
                    }`}
                    size="lg"
                  >
                    {isAdded ? (
                      <span className="flex items-center gap-2">
                        <Check className="h-4 w-4" /> ADDED!
                      </span>
                    ) : (
                      'Add to Cart'
                    )}
                  </Button>
                  <Link href={`/products/${item.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full text-sm font-bold uppercase tracking-wider"
                      size="lg"
                    >
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
