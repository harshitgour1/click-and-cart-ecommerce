import NextImage from 'next/image'
import { Product } from '@/types/product'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import WishlistButton from './WishlistButton'

interface RecommendedProductsProps {
  products: Product[]
}

/**
 * Server Component that displays recommended products in a grid layout
 * No client-side JavaScript needed for rendering
 */
export default function RecommendedProducts({ products }: RecommendedProductsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const isLowStock = product.inventory < 10
        const isOutOfStock = product.inventory === 0

        return (
          <Card key={product.id} className="flex flex-col h-full">
            <CardContent className="flex flex-col h-full p-0">
              {/* Product Image */}
              <div className="relative w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                <NextImage
                  src={product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-grow">
                    {product.name}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-grow">
                  {product.description}
                </p>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <Badge variant={isOutOfStock ? 'error' : isLowStock ? 'warning' : 'success'}>
                      {isOutOfStock ? 'Out of Stock' : `${product.inventory} in stock`}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 capitalize">{product.category}</span>
                  </div>

                  {/* Client Component for interactivity */}
                  <WishlistButton productId={product.id} productName={product.name} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
