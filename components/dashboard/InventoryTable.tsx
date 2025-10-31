'use client'

import { useState, useMemo } from 'react'
import { Product } from '@/types/product'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface InventoryTableProps {
  products: Product[]
}

type SortField = 'name' | 'category' | 'inventory' | 'price' | 'lastUpdated'
type SortDirection = 'asc' | 'desc'

export default function InventoryTable({ products }: InventoryTableProps) {
  const [sortField, setSortField] = useState<SortField>('inventory')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Sort products based on current sort field and direction
  const sortedProducts = useMemo(() => {
    const sorted = [...products].sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      // Handle date strings
      if (sortField === 'lastUpdated') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      // Handle string comparison
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return sorted
  }, [products, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new field with ascending direction
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getInventoryBadge = (inventory: number) => {
    if (inventory === 0) {
      return <Badge variant="error">Out of Stock</Badge>
    } else if (inventory < 10) {
      return <Badge variant="warning">Low Stock ({inventory})</Badge>
    } else if (inventory < 50) {
      return <Badge variant="default">{inventory} units</Badge>
    } else {
      return <Badge variant="success">{inventory} units</Badge>
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <span className="text-gray-400">↕</span>
    }
    return (
      <span className="text-blue-600">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    )
  }

  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Inventory Overview
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          {products.length} products • Click column headers to sort
        </p>
      </div>

      <div className="overflow-x-auto -mx-6 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200" role="table" aria-label="Product inventory table">
              <caption className="sr-only">Product inventory with sortable columns</caption>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col">
                    <button
                      className="w-full text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('name')}
                      aria-label={`Sort by product name ${sortField === 'name' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : ''}`}
                    >
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="truncate">Product</span>
                        <SortIcon field="name" />
                      </div>
                    </button>
                  </th>
                  <th scope="col" className="hidden md:table-cell">
                    <button
                      className="w-full text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('category')}
                      aria-label={`Sort by category ${sortField === 'category' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : ''}`}
                    >
                      <div className="flex items-center gap-1 sm:gap-2">
                        Category
                        <SortIcon field="category" />
                      </div>
                    </button>
                  </th>
                  <th scope="col">
                    <button
                      className="w-full text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('price')}
                      aria-label={`Sort by price ${sortField === 'price' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : ''}`}
                    >
                      <div className="flex items-center gap-1 sm:gap-2">
                        Price
                        <SortIcon field="price" />
                      </div>
                    </button>
                  </th>
                  <th scope="col">
                    <button
                      className="w-full text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('inventory')}
                      aria-label={`Sort by stock level ${sortField === 'inventory' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : ''}`}
                    >
                      <div className="flex items-center gap-1 sm:gap-2">
                        Stock
                        <SortIcon field="inventory" />
                      </div>
                    </button>
                  </th>
                  <th scope="col" className="hidden lg:table-cell">
                    <button
                      className="w-full text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('lastUpdated')}
                      aria-label={`Sort by last updated ${sortField === 'lastUpdated' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : ''}`}
                    >
                      <div className="flex items-center gap-1 sm:gap-2">
                        Updated
                        <SortIcon field="lastUpdated" />
                      </div>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedProducts.map((product, index) => (
                  <tr
                    key={product._id}
                    className={`
                      hover:bg-gray-50 transition-colors
                      ${product.inventory < 10 ? 'bg-amber-50/30' : ''}
                    `}
                  >
                    <th scope="row" className="py-3 px-3 sm:px-4">
                      <div className="font-medium text-sm sm:text-base text-gray-900 truncate max-w-[150px] sm:max-w-xs">
                        {product.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[150px] sm:max-w-xs md:hidden">
                        {product.category}
                      </div>
                    </th>
                    <td className="hidden md:table-cell py-3 px-3 sm:px-4">
                      <span className="text-xs sm:text-sm text-gray-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 sm:px-4">
                      <span className="font-semibold text-sm sm:text-base text-gray-900">
                        ₹{product.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-3 sm:px-4">
                      {getInventoryBadge(product.inventory)}
                    </td>
                    <td className="hidden lg:table-cell py-3 px-3 sm:px-4">
                      <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(product.lastUpdated)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-base sm:text-lg">No products found</p>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">
            Add products to see them in the inventory
          </p>
        </div>
      )}
    </Card>
  )
}
