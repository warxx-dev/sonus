'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ShoppingCart, Trash2, X } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import { useHydration } from '@/lib/hooks/use-store'

export function CartSheet() {
  const { items, removeItem, updateQuantity, clearCart, isOpen, setIsOpen } = useCartStore()
  const isHydrated = useHydration()

  const totalItems = isHydrated ? items.reduce((total, item) => total + item.quantity, 0) : 0
  const totalPrice = isHydrated
    ? items.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="bg-transparent relative p-2 text-white hover:bg-white/10 hover:text-orange-500 cursor-pointer">
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-95 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-bold uppercase">CART ({totalItems})</span>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="cursor-pointer text-sm text-zinc-500 underline transition-colors hover:text-orange-600"
            >
              <X />
            </button>
          )}
        </div>

        <div className="space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <ShoppingCart className="mb-4 h-16 w-16 text-zinc-300" />
              <p className="text-center text-zinc-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="max-h-100 space-y-6 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 rounded-lg">
                    {/* Product Image */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-black">{item.name}</h4>
                      <p className="text-sm text-zinc-600">${item.price.toLocaleString('en-US')}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-zinc-100 px-3 py-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-zinc-500 transition-colors hover:text-orange-600 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-zinc-500 transition-colors hover:text-orange-600 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-zinc-400 transition-colors hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t pt-6">
                <span className="text-sm font-medium uppercase text-zinc-500">TOTAL</span>
                <span className="text-lg font-bold text-black">
                  $ {totalPrice.toLocaleString('en-US')}
                </span>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" className="block w-full" onClick={() => setIsOpen(false)}>
                <Button
                  size="lg"
                  className="w-full bg-orange-600 text-sm font-bold uppercase tracking-wider hover:bg-orange-700"
                >
                  CHECKOUT
                </Button>
              </Link>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
