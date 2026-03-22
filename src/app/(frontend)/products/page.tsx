import { ProductsGrid } from '@/components/ProductsPage/products-grid'

export default function ProductsPage() {
  return (
    <>
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <ProductsGrid />
        </div>
      </section>
    </>
  )
}
