import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const relatedProducts = [
  {
    id: 1,
    name: "XX99 MARK I",
    image: "/images/related/xx99-mark-i.png",
    slug: "xx99-mark-i-headphones",
  },
  {
    id: 2,
    name: "XX59",
    image: "/images/related/xx59.png",
    slug: "xx59-headphones",
  },
  {
    id: 3,
    name: "ZX9 SPEAKER",
    image: "/images/related/zx9-speaker.png",
    slug: "zx9-speaker",
  },
];

export function RelatedProducts() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold uppercase tracking-wide text-black">
          YOU MAY ALSO LIKE
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center space-y-6"
            >
              {/* Product Image */}
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-zinc-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                />
              </div>

              {/* Product Name */}
              <h3 className="text-xl font-bold uppercase tracking-wide text-black">
                {product.name}
              </h3>

              {/* See Product Button */}
              <Link href={`/products/${product.slug}`}>
                <Button
                  size="lg"
                  className="px-8 py-6 text-white text-sm font-bold uppercase tracking-wider"
                >
                  SEE PRODUCT
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
