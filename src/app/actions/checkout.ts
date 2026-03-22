'use server'

import { CartItem } from '@/lib/store/cart-store'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

export async function createCheckoutSession(cartItems: CartItem[], userEmail: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  let sessionUrl: string | null = null

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      customer_email: userEmail,
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/checkout`,
      metadata: {
        cart: JSON.stringify(cartItems.map((i) => ({ id: i.id, qty: i.quantity }))),
      },
    })

    console.log('Stripe Session Created:', session)

    sessionUrl = session.url
  } catch (error) {
    console.error('Stripe Error:', error)
    throw new Error('No se pudo crear la sesión de pago')
  }

  if (sessionUrl) {
    redirect(sessionUrl)
  }
}
