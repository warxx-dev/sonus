import Image from "next/image";

export function AboutSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left - Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold uppercase leading-tight tracking-wide text-black lg:text-5xl">
              BRINGING YOU THE <span className="text-orange-600">BEST</span>{" "}
              AUDIO GEAR
            </h2>
            <p className="text-base leading-relaxed text-zinc-600">
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio
              accessories. We have a large showroom and luxury demonstration
              rooms available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic
              people who make Audiophile the best place to buy your portable
              audio equipment.
            </p>
          </div>

          {/* Right - Image */}
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg lg:h-[700px]">
            <Image
              src="/images/shared/desktop/image-best-gear.jpg"
              alt="Person with headphones"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
