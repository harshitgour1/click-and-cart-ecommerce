'use client'

import { Select } from '@/components/ui/Select'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

interface ProductFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function ProductFilter({
  selectedCategory,
  onCategoryChange,
}: ProductFilterProps) {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...PRODUCT_CATEGORIES.map((category) => ({
      value: category,
      label: category,
    })),
  ]

  return (
    <Select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      options={categoryOptions}
      aria-label="Filter by category"
    />
  )
}
