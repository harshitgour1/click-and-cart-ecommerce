import { Product } from '@/types/product'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12" role="status" aria-live="polite">
        <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          No products found
        </h2>
        <p className="text-gray-600">
          Try adjusting your search or filter criteria
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div 
          key={product.id} 
          className="animate-fade-in"
          style={{ animationDelay: `${index * 30}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
