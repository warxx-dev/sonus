import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface RelatedProduct {
  slug: string;
  name: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

interface RelatedProductsProps {
  relatedProducts: RelatedProduct[];
}

export function RelatedProducts({ relatedProducts }: RelatedProductsProps) {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold uppercase tracking-wide text-black">
          YOU MAY ALSO LIKE
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {relatedProducts.map((product) => (
            <div
              key={product.slug}
              className="flex flex-col items-center space-y-6"
            >
              {/* Product Image */}
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-zinc-100">
                <Image
                  src={product.image.desktop}
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
              <Link href={`/products/${product.slug.split("/")[1]}`}>
                <Button
                  size="lg"
                  className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-white"
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
