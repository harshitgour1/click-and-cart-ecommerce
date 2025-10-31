'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/product'
import { getProducts } from '@/lib/utils/api'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { LOW_STOCK_THRESHOLD } from '@/lib/constants'

interface ProductListProps {
  onEdit?: (product: Product) => void
  refreshTrigger?: number
}

export function ProductList({ onEdit, refreshTrigger }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const fetchProducts = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await getProducts()
      
      if (response.success && response.data) {
        setProducts(response.data)
      } else {
        setError(response.error || 'Failed to fetch products')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchProducts()
  }, [refreshTrigger])
  
  const handleRefresh = () => {
    fetchProducts()
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price)
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center animate-fade-in">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary" role="status" aria-label="Loading"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <Card>
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Products</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={handleRefresh} variant="primary">
            Try Again
          </Button>
        </div>
      </Card>
    )
  }
  
  if (products.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
          <p className="text-gray-600">Create your first product to get started.</p>
        </div>
      </Card>
    )
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
        <Button onClick={handleRefresh} variant="outline" size="sm">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </Button>
      </div>
      
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr 
                key={product.id} 
                className="hover:bg-gray-50 transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.slug}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{product.category}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPrice(product.price)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.inventory === 0 
                      ? 'bg-red-100 text-red-800' 
                      : product.inventory < LOW_STOCK_THRESHOLD 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>{product.inventory} units</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(product.lastUpdated)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {onEdit && (<Button onClick={() => onEdit(product)} variant="ghost" size="sm">Edit</Button>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="md:hidden space-y-4">
        {products.map((product, index) => (
          <Card 
            key={product.id} 
            hover 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.slug}</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{product.category}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Price:</span>
                  <p className="font-semibold text-gray-900">{formatPrice(product.price)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Inventory:</span>
                  <p>
                    <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                      product.inventory === 0 
                        ? 'bg-red-100 text-red-800' 
                        : product.inventory < LOW_STOCK_THRESHOLD 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>{product.inventory} units</span>
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-500">Updated: {formatDate(product.lastUpdated)}</div>
              {onEdit && (
                <div className="pt-2">
                  <Button onClick={() => onEdit(product)} variant="outline" size="sm" className="w-full">Edit Product</Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
