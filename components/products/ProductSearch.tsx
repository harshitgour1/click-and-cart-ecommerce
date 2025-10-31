'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Product } from '@/types/product'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import ProductFilter from './ProductFilter'
import ProductGrid from './ProductGrid'

interface ProductSearchProps {
  products: Product[]
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function ProductSearch({ products }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by search query
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    return filtered
  }, [products, debouncedSearchQuery, selectedCategory])

  const handleClearSearch = useCallback(() => {
    setSearchQuery('')
  }, [])

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category)
  }, [])

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-16 sm:pr-20"
              aria-label="Search products by name or description"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 text-xs sm:text-sm"
                aria-label="Clear search"
              >
                Clear
              </Button>
            )}
          </div>

          {/* Category Filter */}
          <ProductFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Results Count */}
        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
          {debouncedSearchQuery && (
            <span className="ml-1">
              for &quot;<span className="font-medium">{debouncedSearchQuery}</span>&quot;
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span className="ml-1">
              in <span className="font-medium">{selectedCategory}</span>
            </span>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  )
}
