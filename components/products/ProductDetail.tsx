import Link from 'next/link'
import { Product } from '@/types/product'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  // Format price with currency
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(product.price)
  
  // Format last updated date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(product.lastUpdated))
  
  // Determine inventory status and badge variant
  const getInventoryStatus = (inventory: number) => {
    if (inventory === 0) {
      return { text: 'Out of Stock', variant: 'error' as const }
    } else if (inventory < 10) {
      return { text: `Low Stock (${inventory} left)`, variant: 'warning' as const }
    } else if (inventory < 50) {
      return { text: `In Stock (${inventory} available)`, variant: 'info' as const }
    } else {
      return { text: `In Stock (${inventory} available)`, variant: 'success' as const }
    }
  }
  
  const inventoryStatus = getInventoryStatus(product.inventory)
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="mb-4 sm:mb-6 text-xs sm:text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center flex-wrap gap-1 sm:gap-2 text-gray-600">
          <li>
            <Link 
              href="/" 
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <Link 
              href="/" 
              className="hover:text-blue-600 transition-colors"
            >
              Products
            </Link>
          </li>
          <li>
            <span>/</span>
          </li>
          <li className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>
      
      {/* Product Detail Card */}
      <Card className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Product Image Placeholder */}
          <div 
            className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center"
            role="img"
            aria-label={`${product.name} product image`}
          >
            <div className="text-center">
              <div className="text-4xl sm:text-6xl mb-2 sm:mb-4" aria-hidden="true">📦</div>
              <p className="text-gray-500 text-xs sm:text-sm" aria-hidden="true">Product Image</p>
            </div>
          </div>
          
          {/* Product Information */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <div className="mb-2 sm:mb-3">
              <Badge variant="info">{product.category}</Badge>
            </div>
            
            {/* Product Name */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {product.name}
            </h1>
            
            {/* Price */}
            <div className="mb-4 sm:mb-6">
              <span className="text-3xl sm:text-4xl font-bold text-blue-600">
                {formattedPrice}
              </span>
            </div>
            
            {/* Inventory Status */}
            <div className="mb-4 sm:mb-6">
              <Badge variant={inventoryStatus.variant}>
                {inventoryStatus.text}
              </Badge>
            </div>
            
            {/* Description */}
            <div className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {/* Product Details */}
            <div className="border-t border-gray-200 pt-4 sm:pt-6 mt-auto">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                Product Details
              </h2>
              <dl className="space-y-2 text-sm sm:text-base">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-600">Product ID:</dt>
                  <dd className="text-gray-900 font-medium truncate">{product.id}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-600">Category:</dt>
                  <dd className="text-gray-900 font-medium">{product.category}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-600">Stock Level:</dt>
                  <dd className="text-gray-900 font-medium">{product.inventory} units</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-600">Last Updated:</dt>
                  <dd className="text-gray-900 font-medium text-xs sm:text-sm">{formattedDate}</dd>
                </div>
              </dl>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-4 sm:mt-6 flex gap-3">
              <Link
                href="/"
                className="flex-1 bg-gray-100 text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-200 transition-colors text-center"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Additional Information */}
      <div className="max-w-6xl mx-auto mt-6 sm:mt-8">
        <Card>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Additional Information
          </h2>
          <div className="prose prose-sm max-w-none text-sm sm:text-base text-gray-700">
            <p>
              This product page is generated using Incremental Static Regeneration (ISR) 
              with a 60-second revalidation period. This ensures optimal performance while 
              keeping product information up-to-date.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
