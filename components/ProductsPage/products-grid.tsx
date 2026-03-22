'use client'

import { useProductsStore } from '@/lib/store/products-store'
import { Suspense, useEffect, useState } from 'react'
import FiltersPanel from './filters-panel'
import { LayoutGrid, LayoutList } from 'lucide-react'
import { ProductListCard } from './product-list-card'
import { ProductCard } from './product-card'
import { useSearchParams } from 'next/navigation'

function ProductsGridContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')

  const { products, fetchProducts, isLoading } = useProductsStore()

  const [priceRange, setPriceRange] = useState([0, 5000])
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    return categoryParam ? [categoryParam] : []
  })

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const filteredProducts = products.filter((product) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }

    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    if (showNewOnly && !product.new) {
      return false
    }

    return true
  })

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
      {/* Products Grid */}
      <div className="lg:col-span-4">
        {/* Header con título y botones de vista */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            {categoryParam && (
              <>
                <h2 className="text-3xl font-bold uppercase text-black">{categoryParam}</h2>
                <p className="mt-2 text-zinc-600">
                  {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? 's' : ''} found
                </p>
              </>
            )}
          </div>
          {/* Botones de vista */}
          <div className="flex gap-2">
            <FiltersPanel
              priceRange={priceRange}
              selectedCategories={selectedCategories}
              setPriceRange={setPriceRange}
              setSelectedCategories={setSelectedCategories}
              setShowNewOnly={setShowNewOnly}
              showNewOnly={showNewOnly}
            />
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-lg p-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-orange-600 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
              title="List view"
            >
              <LayoutList className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-lg p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-orange-600 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
          </div>
        </div>
        {/* Vista de productos */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white"
              >
                <div className="h-70 animate-pulse bg-zinc-100" />
                <div className="flex flex-col gap-3 p-6">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-zinc-100" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-100" />
                  <div className="mt-2 h-10 w-full animate-pulse rounded bg-zinc-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          viewMode === 'list' ? (
            <div className="space-y-32">
              {filteredProducts.map((product, index) => (
                <ProductListCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-zinc-600">No products found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function ProductsGrid() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-zinc-600">Loading products...</div>}>
      <ProductsGridContent />
    </Suspense>
  )
}
