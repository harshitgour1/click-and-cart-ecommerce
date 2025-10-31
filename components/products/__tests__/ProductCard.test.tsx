import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductCard from '../ProductCard'
import { Product } from '@/types/product'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

describe('ProductCard', () => {
  const mockProduct: Product = {
    _id: '1',
    id: 'test-1',
    name: 'Test Product',
    slug: 'test-product',
    description: 'This is a test product description',
    price: 29.99,
    category: PRODUCT_CATEGORIES[0],
    inventory: 50,
    lastUpdated: new Date().toISOString(),
  }

  it('should render product name', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  it('should render product description', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('This is a test product description')).toBeInTheDocument()
  })

  it('should render product price', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('$29.99')).toBeInTheDocument()
  })

  it('should render product category', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText(PRODUCT_CATEGORIES[0])).toBeInTheDocument()
  })

  it('should show low stock warning when inventory is below 10', () => {
    const lowStockProduct = { ...mockProduct, inventory: 5 }
    render(<ProductCard product={lowStockProduct} />)
    expect(screen.getByText('5 in stock')).toBeInTheDocument()
  })

  it('should show out of stock when inventory is 0', () => {
    const outOfStockProduct = { ...mockProduct, inventory: 0 }
    render(<ProductCard product={outOfStockProduct} />)
    expect(screen.getByText('Out of Stock')).toBeInTheDocument()
  })

  it('should have link to product detail page', () => {
    render(<ProductCard product={mockProduct} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/products/test-product')
  })
})
