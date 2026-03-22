import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Media } from '@/src/payload-types'
import { ArrowLeft } from 'lucide-react'
import { RelatedProducts } from '@/components/related-products'
import { getProductById, getRelatedProducts } from '@/src/app/actions/products'
import { AddToCartClient } from '../../../../../components/ProductsPage/add-to-cart-client'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const id = Number(resolvedParams.id)

  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(id)

  const imageUrl = typeof product.image === 'object' ? ((product.image as Media).url ?? '') : ''

  return (
    <>
      {/* Product Detail Section */}
      <section className="w-full bg-zinc-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Go Back Link */}
          <Link
            href="/products"
            className="flex items-center gap-2 mb-12 text-lg text-zinc-500 transition-colors hover:text-orange-600"
          >
            <ArrowLeft /> Back
          </Link>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left - Product Image */}
            <div className="relative h-100 overflow-hidden rounded-lg bg-zinc-100 lg:h-140">
              <Image src={imageUrl} alt={product.name} fill className="object-contain p-12" />
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
              <p className="text-base leading-relaxed text-zinc-600">{product.description}</p>
              <p className="text-2xl font-bold text-black">
                $ {product.price.toLocaleString('en-US')}
              </p>

              <AddToCartClient product={product} imageUrl={imageUrl} />
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
              <p className="text-base leading-relaxed text-zinc-600">{product.features}</p>
            </div>

            {/* In The Box */}
            {product.inTheBox && product.inTheBox.length > 0 && (
              <div>
                <h2 className="mb-6 text-3xl font-bold uppercase tracking-wide text-black">
                  IN THE BOX
                </h2>
                <ul className="space-y-2">
                  {product.inTheBox.map((item, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="font-bold text-orange-600">{item.quantity}x</span>
                      <span className="text-zinc-600">{item.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {product.gallery && product.gallery.length > 0 && (
        <section className="w-full bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* First two images stacked */}
              <div className="flex flex-col gap-6">
                {product.gallery.slice(0, 2).map((item, index) => {
                  const galleryUrl =
                    typeof item.image === 'object' ? ((item.image as Media).url ?? '') : ''
                  return (
                    <div
                      key={item.id ?? index}
                      className="relative h-75 overflow-hidden rounded-lg"
                    >
                      <Image
                        src={galleryUrl}
                        alt={`${product.name} gallery ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )
                })}
              </div>
              {/* Third image full height */}
              {product.gallery[2] && (
                <div className="relative h-full min-h-75 overflow-hidden rounded-lg md:min-h-156">
                  <Image
                    src={
                      typeof product.gallery[2].image === 'object'
                        ? ((product.gallery[2].image as Media).url ?? '')
                        : ''
                    }
                    alt={`${product.name} gallery 3`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <RelatedProducts relatedProducts={relatedProducts} />
    </>
  )
}
