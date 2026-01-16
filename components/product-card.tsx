import { Product } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

export const ProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  return (
    <div
      key={product.id}
      className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${
        index % 2 === 1 ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Product Image */}
      <div
        className={`relative h-[400px] overflow-hidden rounded-lg bg-zinc-100 lg:h-[560px] ${
          index % 2 === 1 ? "lg:order-2" : ""
        }`}
      >
        <Image
          src={product.image.desktop}
          alt={product.name}
          fill
          className="object-contain p-12"
        />
      </div>

      {/* Product Info */}
      <div
        className={`flex flex-col justify-center space-y-6 ${
          index % 2 === 1 ? "lg:order-1" : ""
        }`}
      >
        {product.new && (
          <p className="text-sm font-medium uppercase tracking-[0.5em] text-orange-600">
            NEW PRODUCT
          </p>
        )}
        <h2 className="text-4xl font-bold uppercase leading-tight tracking-wide text-black lg:text-5xl">
          {product.name}
        </h2>
        <p className="text-base leading-relaxed text-zinc-600">
          {product.description}
        </p>
        <p className="text-lg font-bold text-black">
          ${product.price.toLocaleString()}
        </p>
        <Link href={`/products/${product.slug}`}>
          <Button
            size="lg"
            className="px-8 py-6 text-sm font-bold uppercase tracking-wider"
          >
            SEE PRODUCT
          </Button>
        </Link>
      </div>
    </div>
  );
};
