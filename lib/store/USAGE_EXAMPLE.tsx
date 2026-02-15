// Ejemplo de uso de la store de productos desde cualquier parte del proyecto

import { useProductsStore } from "@/lib/store/products-store";
import { useEffect } from "react";

// Ejemplo 1: Obtener todos los productos
export function ProductsListExample() {
  const { products, fetchProducts, isLoading } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        products.map((product) => <div key={product.id}>{product.name}</div>)
      )}
    </div>
  );
}

// Ejemplo 2: Obtener un producto específico por slug
export function SingleProductExample({ slug }: { slug: string }) {
  const { getProductBySlug, fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const product = getProductBySlug(slug);

  return product ? <div>{product.name}</div> : <div>Not found</div>;
}

// Ejemplo 3: Filtrar productos por categoría
export function CategoryProductsExample({ category }: { category: string }) {
  const { getProductsByCategory, fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const products = getProductsByCategory(category);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

// Ejemplo 4: Acceder directamente sin componente
export function someUtilityFunction() {
  const store = useProductsStore.getState();

  // Obtener todos los productos
  const allProducts = store.products;

  // Obtener un producto específico
  const product = store.getProductBySlug("xx99-mark-ii");

  // Obtener productos por categoría
  const headphones = store.getProductsByCategory("headphones");

  return { allProducts, product, headphones };
}
