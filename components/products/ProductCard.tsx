import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/product'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const isLowStock = product.inventory < 10
  const isOutOfStock = product.inventory === 0

  return (
    <Link href={`/products/${product.slug}`} className="block h-full group">
      <Card hover className="h-full flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <CardContent className="flex flex-col h-full p-0">
          {/* Product Image */}
          <div className="relative w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
            <Image
              src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
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

            <div className="mt-auto space-y-2">
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
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
