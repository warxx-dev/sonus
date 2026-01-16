"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Mock cart data - replace with actual cart state management
const cartItems = [
  {
    id: 1,
    name: "XX99 MK II",
    price: 2999,
    quantity: 1,
    image: "/images/cart/xx99-mk-ii.png",
  },
  {
    id: 2,
    name: "XX59",
    price: 899,
    quantity: 2,
    image: "/images/cart/xx59.png",
  },
  {
    id: 3,
    name: "YX1",
    price: 599,
    quantity: 1,
    image: "/images/cart/yx1.png",
  },
];

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("e-money");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 50;
  const vat = Math.round(subtotal * 0.2);
  const total = subtotal + shipping;

  return (
    <>
      <section className="w-full bg-zinc-50 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/"
            className="inline-block text-sm text-zinc-500 transition-colors hover:text-orange-600"
          >
            Go Back
          </Link>
        </div>
      </section>

      <section className="w-full bg-zinc-50 pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="rounded-lg bg-white p-8 lg:p-12">
                <h1 className="mb-8 text-3xl font-bold uppercase tracking-wide text-black">
                  CHECKOUT
                </h1>

                {/* Billing Details */}
                <div className="mb-8">
                  <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-orange-600">
                    BILLING DETAILS
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="name"
                        className="mb-2 block text-xs font-bold text-black"
                      >
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Alexei Ward"
                        className="w-full border-zinc-300 bg-white text-black placeholder:text-zinc-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/50"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="mb-2 block text-xs font-bold text-black"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="alexei@mail.com"
                        className="w-full border-zinc-300 bg-white text-black placeholder:text-zinc-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/50"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="phone"
                        className="mb-2 block text-xs font-bold text-black"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+1 202-555-0136"
                        className="w-full border-zinc-300 bg-white text-black placeholder:text-zinc-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="mb-8">
                  <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-orange-600">
                    SHIPPING INFO
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <Label
                        htmlFor="address"
                        className="mb-2 block text-xs font-bold text-black"
                      >
                        Address
                      </Label>
                      <Input
                        id="address"
                        placeholder="1137 Williams Avenue"
                        className="w-full border-zinc-300 bg-white text-black placeholder:text-zinc-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/50"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <Label
                          htmlFor="zip"
                          className="mb-2 block text-xs font-bold text-black"
                        >
                          ZIP Code
                        </Label>
                        <Input
                          id="zip"
                          placeholder="10001"
                          className="w-full border-zinc-300 bg-white text-black placeholder:text-zinc-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/50"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="city"
                          className="mb-2 block text-xs font-bold text-black"
                        >
                          City
                        </Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          className="w-full border-zinc-300 bg-white text-black placeholder:text-zinc-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/50"
                        />
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="country"
                        className="mb-2 block text-xs font-bold text-black"
                      >
                        Country
                      </Label>
                      <Input
                        id="country"
                        placeholder="United States"
                        className="w-full border-zinc-300 bg-white text-black placeholder:text-zinc-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div>
                  <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-orange-600">
                    PAYMENT DETAILS
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <Label className="mb-2 block text-xs font-bold text-black">
                        Payment Method
                      </Label>
                    </div>
                    <div>
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3 rounded-lg border border-zinc-300 bg-white p-4 hover:border-orange-600">
                          <RadioGroupItem value="e-money" id="e-money" />
                          <Label
                            htmlFor="e-money"
                            className="cursor-pointer text-black"
                          >
                            e-Money
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 rounded-lg border border-zinc-300 bg-white p-4 hover:border-orange-600">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label
                            htmlFor="cash"
                            className="cursor-pointer text-black"
                          >
                            Cash on Delivery
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {paymentMethod === "e-money" && (
                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <Label
                          htmlFor="emoney-number"
                          className="mb-2 block text-xs font-bold text-black"
                        >
                          e-Money Number
                        </Label>
                        <Input
                          id="emoney-number"
                          placeholder="238521993"
                          className="w-full border-zinc-300 bg-white text-black placeholder:text-zinc-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/50"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="emoney-pin"
                          className="mb-2 block text-xs font-bold text-black"
                        >
                          e-Money PIN
                        </Label>
                        <Input
                          id="emoney-pin"
                          placeholder="6891"
                          type="password"
                          className="w-full border-zinc-300 bg-white text-black placeholder:text-zinc-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/50"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-lg bg-white p-8">
                <h2 className="mb-6 text-lg font-bold uppercase tracking-wide text-black">
                  SUMMARY
                </h2>

                {/* Cart Items */}
                <div className="mb-6 space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-zinc-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-black">
                          {item.name}
                        </p>
                        <p className="text-sm text-zinc-500">
                          $ {item.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-zinc-500">
                        x{item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 border-t border-zinc-200 pt-6">
                  <div className="flex justify-between">
                    <p className="text-sm uppercase text-zinc-500">TOTAL</p>
                    <p className="text-lg font-bold text-black">
                      $ {subtotal.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm uppercase text-zinc-500">SHIPPING</p>
                    <p className="text-lg font-bold text-black">$ {shipping}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm uppercase text-zinc-500">
                      VAT (INCLUDED)
                    </p>
                    <p className="text-lg font-bold text-black">
                      $ {vat.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between pt-4">
                    <p className="text-sm uppercase text-zinc-500">
                      GRAND TOTAL
                    </p>
                    <p className="text-lg font-bold text-orange-600">
                      $ {total.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Continue & Pay Button */}
                <Button
                  size="lg"
                  className="mt-8 w-full bg-orange-600 py-6 text-sm font-bold uppercase tracking-wider hover:bg-orange-700"
                >
                  CONTINUE & PAY
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
