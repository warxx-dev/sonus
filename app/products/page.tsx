"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AboutSection } from "@/components/about-section";
import { ProductCard } from "@/components/product-card";
import { useSearchParams } from "next/navigation";
import { useProductsStore } from "@/lib/store/products-store";
import { LayoutGrid, LayoutList } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const { products, fetchProducts, isLoading } = useProductsStore();

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Inicializar con el query param si existe (solo la primera vez)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    return categoryParam ? [categoryParam] : [];
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const brands = ["Audiophile", "Sony", "Bose", "Sennheiser"];
  const categories = ["headphones", "speakers", "earphones"];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  // Filtrar productos según criterios seleccionados
  const filteredProducts = products.filter((product) => {
    // Filtro por categoría (desde query param o selección manual)
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(product.category)
    ) {
      return false;
    }

    // Filtro por rango de precio
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Filtro por marca (si existe la propiedad)
    if (
      selectedBrands.length > 0 &&
      !selectedBrands.some((brand) => product.name.includes(brand))
    ) {
      return false;
    }

    // Filtro por productos nuevos
    if (showNewOnly && !product.new) {
      return false;
    }

    return true;
  });

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

                {/* Category Filter */}
                <div>
                  <Label className="mb-4 block text-sm font-bold text-black">
                    Category
                  </Label>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label
                          htmlFor={category}
                          className="cursor-pointer text-sm text-zinc-700 capitalize"
                        >
                          {category}
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
                    setSelectedCategories([]);
                    setShowNewOnly(false);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Header con título y botones de vista */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  {categoryParam && (
                    <>
                      <h2 className="text-3xl font-bold uppercase text-black">
                        {categoryParam}
                      </h2>
                      <p className="mt-2 text-zinc-600">
                        {filteredProducts.length} product
                        {filteredProducts.length !== 1 ? "s" : ""} found
                      </p>
                    </>
                  )}
                </div>
                {/* Botones de vista */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`rounded-lg p-2 transition-colors ${
                      viewMode === "list"
                        ? "bg-orange-600 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                    title="List view"
                  >
                    <LayoutList className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`rounded-lg p-2 transition-colors ${
                      viewMode === "grid"
                        ? "bg-orange-600 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                    title="Grid view"
                  >
                    <LayoutGrid className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {/* Vista de productos */}
              {filteredProducts.length > 0 ? (
                viewMode === "list" ? (
                  <div className="space-y-32">
                    {filteredProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="group flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-lg"
                      >
                        {/* Product Image */}
                        <div className="relative h-[280px] overflow-hidden bg-zinc-100">
                          <Image
                            src={product.image.desktop}
                            alt={product.name}
                            fill
                            className="object-contain p-8 transition-transform group-hover:scale-105"
                          />
                          {product.new && (
                            <span className="absolute left-4 top-4 rounded-full bg-orange-600 px-3 py-1 text-xs font-bold uppercase text-white">
                              New
                            </span>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="mb-2 text-lg font-bold uppercase text-black">
                            {product.name}
                          </h3>
                          <p className="mb-4 line-clamp-2 flex-1 text-sm text-zinc-600">
                            {product.description}
                          </p>
                          <p className="mb-4 text-lg font-bold text-black">
                            ${product.price.toLocaleString()}
                          </p>
                          <Link
                            href={`/products/${product.slug}`}
                            className="w-full"
                          >
                            <Button
                              size="lg"
                              className="w-full text-sm font-bold uppercase tracking-wider"
                            >
                              See Product
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-20">
                  <p className="text-xl text-zinc-600">
                    No products found matching your filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />
    </>
  );
}
