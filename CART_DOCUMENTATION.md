# Sistema de Carrito de Compras - Documentación

## ✅ Implementación Completa

### 1. Store del Carrito (`lib/store/cart-store.ts`)

**Características:**

- ✅ Persistencia en localStorage (los items se mantienen al recargar)
- ✅ Agregar productos con cantidad
- ✅ Actualizar cantidad de productos
- ✅ Eliminar productos individuales
- ✅ Limpiar carrito completo
- ✅ Calcular total de items
- ✅ Calcular precio total

**Interface CartItem:**

```typescript
{
  id: number;
  slug: string;
  name: string;
  shortName: string;
  price: number;
  quantity: number;
  image: string;
}
```

**Métodos disponibles:**

```typescript
const {
  items, // Array de productos en el carrito
  addItem, // Agregar producto
  removeItem, // Eliminar producto por id
  updateQuantity, // Actualizar cantidad
  clearCart, // Vaciar carrito
  getTotalItems, // Total de items
  getTotalPrice, // Precio total
} = useCartStore();
```

### 2. Componente CartSheet (`components/cart-sheet.tsx`)

**Características:**

- ✅ Sheet lateral que se abre desde el header
- ✅ Muestra todos los productos del carrito
- ✅ Badge con número de items en el icono
- ✅ Controles +/- para ajustar cantidad
- ✅ Botón de eliminar individual
- ✅ Botón "Remove all" para vaciar carrito
- ✅ Muestra total del precio
- ✅ Botón de checkout que lleva a `/checkout`
- ✅ Estado vacío con mensaje y icono

### 3. Integración en Header

El carrito ahora aparece en el header con:

- Icono de carrito
- Badge con número de items (solo si hay items)
- Click abre el sheet lateral

### 4. Funcionalidad "Add to Cart" en Product Page

En la página de detalles del producto (`app/products/[slug]/page.tsx`):

- ✅ Botón "ADD TO CART" funcional
- ✅ Agrega el producto con la cantidad seleccionada
- ✅ Resetea la cantidad a 1 después de agregar
- ✅ Usa `cartImage` del producto para mostrar en el carrito

## 🎯 Cómo Usar

### Agregar un producto al carrito desde cualquier componente:

```tsx
import { useCartStore } from "@/lib/store/cart-store";

function MyComponent() {
  const { addItem } = useCartStore();

  const handleAddProduct = () => {
    addItem(
      {
        id: 1,
        slug: "xx99-mark-two",
        name: "XX99 Mark II Headphones",
        shortName: "XX99 MK II",
        price: 2999,
        image: "/images/cart/image-xx99-mark-two-headphones.jpg",
      },
      2, // cantidad
    );
  };

  return <button onClick={handleAddProduct}>Add to Cart</button>;
}
```

### Obtener información del carrito:

```tsx
import { useCartStore } from "@/lib/store/cart-store";

function MyComponent() {
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  return (
    <div>
      <p>Total items: {getTotalItems()}</p>
      <p>Total price: ${getTotalPrice()}</p>
      <p>Cart items: {items.length}</p>
    </div>
  );
}
```

### Actualizar cantidad:

```tsx
const { updateQuantity } = useCartStore();

// Incrementar
updateQuantity(productId, currentQuantity + 1);

// Decrementar
updateQuantity(productId, currentQuantity - 1);
```

## 🔄 Flujo de Usuario

1. Usuario navega a un producto
2. Selecciona cantidad deseada
3. Click en "ADD TO CART"
4. Producto se agrega al carrito
5. Badge en el header muestra número de items
6. Click en icono de carrito abre el sheet
7. Usuario puede ajustar cantidades o eliminar productos
8. Click en "CHECKOUT" para proceder al pago

## 💾 Persistencia

El carrito se guarda automáticamente en `localStorage` con la clave `cart-storage`. Los datos persisten entre sesiones del navegador.

## 🎨 Características de UX

- ✅ Feedback visual con badge de cantidad
- ✅ Animaciones suaves al abrir/cerrar
- ✅ Botones hover con cambio de color
- ✅ Estado vacío informativo
- ✅ Scroll en lista de productos si hay muchos items
- ✅ Layout responsive
