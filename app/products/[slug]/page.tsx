"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RelatedProducts } from "@/components/related-products";
import { CategoriesSection } from "@/components/categories-section";
import { AboutSection } from "@/components/about-section";

// Mock product data - replace with actual data fetching
const product = {
  slug: "xx99-mark-ii-headphones",
  name: "XX99 MARK II HEADPHONES",
  isNew: true,
  price: 2999,
  description:
    "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
  image: "/images/products/xx99-mark-ii.png",
  features: [
    "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you're taking a business call or just in your own personal space, the auto on/off and pause features ensure that you'll never miss a beat.",
    "The advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5. 0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.",
  ],
  inTheBox: [
    { quantity: 1, item: "Headphone Unit" },
    { quantity: 2, item: "Replacement Earcups" },
    { quantity: 1, item: "User Manual" },
    { quantity: 1, item: "3.5mm 5m Audio Cable" },
    { quantity: 1, item: "Travel Bag" },
  ],
};

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      {/* Product Detail Section */}
      <section className="w-full bg-zinc-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Go Back Link */}
          <Link
            href="/"
            className="mb-12 inline-block text-sm text-zinc-500 transition-colors hover:text-orange-600"
          >
            Go Back
          </Link>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left - Product Image */}
            <div className="relative h-[400px] overflow-hidden rounded-lg bg-zinc-100 lg:h-[560px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-12"
              />
            </div>

            {/* Right - Product Info */}
            <div className="flex flex-col justify-center space-y-6">
              {product.isNew && (
                <p className="text-sm font-medium uppercase tracking-[0.5em] text-orange-600">
                  NEW PRODUCT
                </p>
              )}
              <h1 className="text-4xl font-bold uppercase leading-tight tracking-wide text-black lg:text-5xl">
                {product.name}
              </h1>
              <p className="text-base leading-relaxed text-zinc-600">
                {product.description}
              </p>
              <p className="text-2xl font-bold text-black">
                $ {product.price.toLocaleString()}
              </p>

              {/* Quantity and Add to Cart */}
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
                  <span className="w-12 text-center text-sm font-bold">
                    {quantity}
                  </span>
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
                  className="bg-orange-600 px-8 text-sm font-bold uppercase tracking-wider hover:bg-orange-700"
                >
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features and In The Box Section */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Features */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-3xl font-bold uppercase tracking-wide text-black">
                FEATURES
              </h2>
              <div className="space-y-6">
                {product.features.map((feature, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed text-zinc-600"
                  >
                    {feature}
                  </p>
                ))}
              </div>
            </div>

            {/* In The Box */}
            <div>
              <h2 className="mb-6 text-3xl font-bold uppercase tracking-wide text-black">
                IN THE BOX
              </h2>
              <ul className="space-y-2">
                {product.inTheBox.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="font-bold text-orange-600">
                      {item.quantity}x
                    </span>
                    <span className="text-zinc-600">{item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts />

      {/* Categories Section */}
      <CategoriesSection />

      {/* About Section */}
      <AboutSection />
    </>
  );
}
