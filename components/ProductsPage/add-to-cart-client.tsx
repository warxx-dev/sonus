'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cart-store'
import type { Product } from '@/src/payload-types'
import { Check } from 'lucide-react'
import { toast } from 'sonner'

interface AddToCartClientProps {
  product: Product
  imageUrl: string
}

export function AddToCartClient({ product, imageUrl }: AddToCartClientProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCartStore()

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: imageUrl,
      },
      quantity,
    )

    // Show toast
    toast.success(`Added to cart: ${product.name}`, {
      description: `${quantity} unit(s) added.`,
    })

    // Button state change & Cart pop open
    setIsAdded(true)
    setQuantity(1)

    // Revert button text/color after 2 seconds
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <div className="flex items-center gap-4">
      {/* Quantity Selector */}
      <div className="flex items-center bg-zinc-100">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDecrease}
          className="h-12 px-4 text-zinc-500 hover:bg-transparent hover:text-orange-600"
        >
          -
        </Button>
        <span className="w-12 text-center text-sm font-bold text-black">{quantity}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleIncrease}
          className="h-12 px-4 text-zinc-500 hover:bg-transparent hover:text-orange-600"
        >
          +
        </Button>
      </div>

      {/* Add to Cart Button */}
      <Button
        size="lg"
        onClick={handleAddToCart}
        className={`min-w-40 px-8 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
          isAdded
            ? 'bg-green-600 hover:bg-green-700 pointer-events-none'
            : 'bg-orange-600 hover:bg-orange-700'
        }`}
      >
        {isAdded ? (
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4" /> ADDED!
          </span>
        ) : (
          'ADD TO CART'
        )}
      </Button>
    </div>
  )
}
