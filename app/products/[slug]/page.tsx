"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RelatedProducts } from "@/components/related-products";
import { CategoriesSection } from "@/components/categories-section";
import { AboutSection } from "@/components/about-section";
import { useProductsStore } from "@/lib/store/products-store";
import { useCartStore } from "@/lib/store/cart-store";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { getProductBySlug, fetchProducts, isLoading } = useProductsStore();
  const { addItem } = useCartStore();
  const product = getProductBySlug(slug);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          shortName: product.shortName,
          price: product.price,
          image: product.cartImage,
        },
        quantity,
      );
      // Resetear cantidad después de agregar
      setQuantity(1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

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
                src={product.image.desktop}
                alt={product.name}
                fill
                className="object-contain p-12"
              />
            </div>

            {/* Right - Product Info */}
            <div className="flex flex-col justify-center space-y-6">
              {product.new && (
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
                  <span className="w-12 text-center text-sm font-bold text-black">
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
                  onClick={handleAddToCart}
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
                <p className="text-base leading-relaxed text-zinc-600">
                  {product.features}
                </p>
              </div>
            </div>

            {/* In The Box */}
            <div>
              <h2 className="mb-6 text-3xl font-bold uppercase tracking-wide text-black">
                IN THE BOX
              </h2>
              <ul className="space-y-2">
                {product.includedItems.map((item, index) => (
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

      {/* Gallery Section */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* First Image */}
            <div className="relative h-[300px] overflow-hidden rounded-lg">
              <Image
                src={product.gallery.first.desktop}
                alt={`${product.name} gallery 1`}
                fill
                className="object-cover"
              />
            </div>
            {/* Second Image */}
            <div className="relative h-[300px] overflow-hidden rounded-lg md:row-span-2">
              <Image
                src={product.gallery.third.desktop}
                alt={`${product.name} gallery 3`}
                fill
                className="object-cover"
              />
            </div>
            {/* Third Image */}
            <div className="relative h-[300px] overflow-hidden rounded-lg">
              <Image
                src={product.gallery.second.desktop}
                alt={`${product.name} gallery 2`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts relatedProducts={product.others} />

      {/* About Section */}
      <AboutSection />
    </>
  );
}
