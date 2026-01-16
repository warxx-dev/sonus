import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "ZX9 SPEAKER",
    description:
      "Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.",
    image: "/images/home/desktop/image-speaker-zx9-1.png",
    href: "/products/zx9-speaker",
    variant: "primary" as const,
  },
  {
    id: 2,
    name: "ZX7 SPEAKER",
    image: "/images/home/desktop/image-speaker-zx7.jpg",
    href: "/products/zx7-speaker",
    variant: "secondary" as const,
  },
  {
    id: 3,
    name: "YX1 EARPHONES",
    image: "/images/home/desktop/image-earphones-yx1.jpg",
    href: "/products/yx1-earphones",
    variant: "tertiary" as const,
  },
];

export function HotProducts() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl space-y-8 px-6">
        {/* Title */}
        <h2 className="text-center text-3xl font-bold uppercase tracking-wide text-black lg:text-4xl">
          HOT PRODUCTS
        </h2>

        {/* ZX9 Speaker - Large Orange Card */}
        <div className="relative overflow-hidden rounded-lg px-12 py-20 lg:px-24 lg:py-32">
          <div className="absolute inset-0">
            <Image
              src={products[0].image}
              alt={products[0].name}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative flex items-center justify-end gap-12">
            {/* Right - Content */}
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-4xl font-bold uppercase tracking-wide text-white lg:text-6xl">
                {products[0].name}
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-white/90">
                {products[0].description}
              </p>
              <Link href={products[0].href}>
                <Button
                  size="lg"
                  className="bg-black px-8 py-6 text-sm font-bold uppercase tracking-wider text-white hover:bg-zinc-800"
                >
                  SEE PRODUCT
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ZX7 Speaker - Gray Card with Background Image */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0">
            <Image
              src={products[1].image}
              alt={products[1].name}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative px-12 py-24 lg:px-24">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold uppercase tracking-wide text-black">
                {products[1].name}
              </h2>
              <Link href={products[1].href}>
                <Button
                  size="lg"
                  className="border-2 border-black bg-transparent px-8 py-6 text-sm font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white"
                >
                  SEE PRODUCT
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* YX1 Earphones - Two Column Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left - Image */}
          <div className="relative h-[300px] overflow-hidden rounded-lg">
            <Image
              src={products[2].image}
              alt={products[2].name}
              fill
              className="object-cover"
            />
          </div>

          {/* Right - Content */}
          <div className="flex items-center rounded-lg bg-zinc-100 px-12 py-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold uppercase tracking-wide text-black">
                {products[2].name}
              </h2>
              <Link href={products[2].href}>
                <Button
                  size="lg"
                  className="border-2 border-black bg-transparent px-8 py-6 text-sm font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white"
                >
                  SEE PRODUCT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
