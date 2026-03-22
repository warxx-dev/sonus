import Image from 'next/image'
import { SeeProductButton } from '@/components/ui/see-product-button'

export function HeroSection() {
  return (
    <section className="relative min-h-150 w-full bg-zinc-900 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-32">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.5em] text-zinc-400">
            NEW PRODUCT
          </p>
          <h1 className="text-4xl font-bold uppercase leading-tight tracking-wide lg:text-6xl">
            XX99 MARK II
            <br />
            HEADPHONES
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-zinc-300">
            Experience natural, lifelike audio and exceptional build quality made for the passionate
            music enthusiast.
          </p>
          <SeeProductButton
            href={'/products/4'}
            className="px-8 py-6 text-sm font-bold uppercase tracking-wider"
          />
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative h-100 w-100 lg:h-125 lg:w-125">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-87.5 w-87.5 lg:h-112.5 lg:w-112.5">
                <div className="absolute inset-0 rounded-full bg-zinc-800 blur-2xl" />
              </div>
              <Image
                src="/images/home/desktop/image-hero1.png"
                alt="XX99 Mark II Headphones"
                fill
                className="object-contain mix-blend-normal"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
