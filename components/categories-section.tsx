import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "HEADPHONES",
    image: "/images/shared/desktop/image-headphones.png",
    href: "/headphones",
  },
  {
    id: 2,
    name: "SPEAKERS",
    image: "/images/shared/desktop/image-speakers.png",
    href: "/speakers",
  },
  {
    id: 3,
    name: "EARPHONES",
    image: "/images/shared/desktop/image-earphones.png",
    href: "/earphones",
  },
];

export function CategoriesSection() {
  return (
    <section className="w-full bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-24 sm:gap-6 lg:gap-8 md:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="cursor-pointer group relative flex flex-col items-center rounded-lg bg-zinc-100 px-6 pb-8 pt-20 transition-transform hover:scale-105"
            >
              <div className="relative mb-6 h-10 w-40">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={600}
                  height={600}
                  className="object-contain absolute -top-36"
                />
              </div>

              <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-black">
                {category.name}
              </h3>

              <Link href={category.href}>
                <Button className="bg-transparent hover:bg-transparent! text-sm font-bold uppercase tracking-wider text-zinc-500 transition-colors group-hover:text-orange-600">
                  SHOP
                  <ChevronRight className="ml-2 h-4 w-4 text-orange-600 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
