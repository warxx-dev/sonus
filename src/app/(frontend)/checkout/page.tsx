'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useCartStore } from '@/lib/store/cart-store'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { checkoutSchema, type CheckoutFormValues } from '@/lib/schemas/checkout-schema'
import { createCheckoutSession } from '../../actions/checkout'
import CartSheetItems from '@/components/Cart/cart-sheet-items'

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      country: '',
    },
  })

  const subtotal = getTotalPrice()
  const shipping = items.length > 0 ? 50 : 0
  const total = subtotal + shipping

  const onSubmit = async (data: CheckoutFormValues) => {
    await createCheckoutSession(items, data.email)
  }

  const inputClassName =
    'w-full border-zinc-300 bg-white text-black placeholder:text-zinc-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/50'

  return (
    <>
      <section className="w-full bg-zinc-50 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/"
            className="inline-block text-sm text-zinc-500 transition-colors hover:text-orange-600"
          >
            <ArrowLeft /> Back
          </Link>
        </div>
      </section>

      <section className="w-full bg-zinc-50 pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="rounded-lg bg-white p-8 lg:p-12">
                    <h1 className="mb-8 text-3xl font-bold uppercase tracking-wide text-black">
                      CHECKOUT
                    </h1>

                    <div className="mb-8">
                      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-orange-600">
                        BILLING DETAILS
                      </h2>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold text-black">Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Alexei Ward"
                                  className={inputClassName}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold text-black">
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="alexei@mail.com"
                                  className={inputClassName}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="mb-8">
                      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-orange-600">
                        SHIPPING INFO
                      </h2>
                      <div className="grid grid-cols-1 gap-6">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold text-black">
                                Address
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="1137 Williams Avenue"
                                  className={inputClassName}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold text-black">
                                Country
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="United States"
                                  className={inputClassName}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="rounded-lg bg-white p-8">
                    <h2 className="mb-6 text-lg font-bold uppercase tracking-wide text-black">
                      SUMMARY
                    </h2>

                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <ShoppingCart className="mb-4 h-16 w-16 text-zinc-300" />
                        <p className="text-center text-zinc-500">Your cart is empty</p>
                        <Link href="/products" className="mt-4">
                          <Button>Continue Shopping</Button>
                        </Link>
                      </div>
                    ) : (
                      <>
                        <CartSheetItems
                          items={items}
                          shipping={shipping}
                          subtotal={subtotal}
                          total={total}
                        />
                        <Button
                          type="submit"
                          size="lg"
                          className="mt-8 w-full bg-orange-600 py-6 text-sm font-bold uppercase tracking-wider hover:bg-orange-700"
                          disabled={items.length === 0}
                        >
                          CONTINUE & PAY
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </>
  )
}
