import { Product } from '@/src/payload-types'
import { ProductCard } from './ProductsPage/product-card'

interface RelatedProductsProps {
  relatedProducts: Product[]
}

export function RelatedProducts({ relatedProducts }: RelatedProductsProps) {
  console.log(relatedProducts[0].image)
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold uppercase tracking-wide text-black">
          YOU MAY ALSO LIKE
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {relatedProducts.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
