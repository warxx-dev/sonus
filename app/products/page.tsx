"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AboutSection } from "@/components/about-section";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const brands = ["Audiophile", "Sony", "Bose", "Sennheiser"];

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <>
      {/* Products List with Filters */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {/* Filters Panel */}
            <aside className="lg:col-span-1">
              <div className="sticky top-6 space-y-8 rounded-lg border border-zinc-200 bg-white p-6">
                <div>
                  <h3 className="mb-4 text-lg font-bold uppercase text-black">
                    Filters
                  </h3>
                </div>

                {/* Price Range Filter */}
                <div>
                  <Label className="mb-4 block text-sm font-bold text-black">
                    Price Range
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000}
                    step={100}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-zinc-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <Label className="mb-4 block text-sm font-bold text-black">
                    Brand
                  </Label>
                  <div className="space-y-3">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <Label
                          htmlFor={brand}
                          className="cursor-pointer text-sm text-zinc-700"
                        >
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* New Products Only */}
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="new-only"
                      checked={showNewOnly}
                      onCheckedChange={(checked) =>
                        setShowNewOnly(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="new-only"
                      className="cursor-pointer text-sm font-bold text-black"
                    >
                      New Products Only
                    </Label>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  className="w-full"
                  onClick={() => {
                    setPriceRange([0, 5000]);
                    setSelectedBrands([]);
                    setShowNewOnly(false);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="space-y-32 lg:col-span-3">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />
    </>
  );
}
