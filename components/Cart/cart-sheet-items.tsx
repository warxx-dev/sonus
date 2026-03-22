import { CartItem } from '@/lib/store/cart-store'
import Image from 'next/image'

interface CartSheetItemsProps {
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
}

export default function CartSheetItems({ items, subtotal, shipping, total }: CartSheetItemsProps) {
  return (
    <>
      <div className="mb-6 space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-zinc-100">
              <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-black">{item.name}</p>
              <p className="text-sm text-zinc-500">$ {item.price.toLocaleString('en-US')}</p>
            </div>
            <p className="text-sm font-bold text-zinc-500">x{item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-zinc-200 pt-6">
        <div className="flex justify-between">
          <p className="text-sm uppercase text-zinc-500">TOTAL</p>
          <p className="text-lg font-bold text-black">$ {subtotal.toLocaleString('en-US')}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm uppercase text-zinc-500">SHIPPING</p>
          <p className="text-lg font-bold text-black">$ {shipping}</p>
        </div>
        <div className="flex justify-between pt-4">
          <p className="text-sm uppercase text-zinc-500">GRAND TOTAL</p>
          <p className="text-lg font-bold text-orange-600">$ {total.toLocaleString('en-US')}</p>
        </div>
      </div>
    </>
  )
}
