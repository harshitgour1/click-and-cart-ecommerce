import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProductSearch from '../ProductSearch'
import { Product } from '@/types/product'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

describe('ProductSearch', () => {
  const mockProducts: Product[] = [
    {
      _id: '1',
      id: 'test-1',
      name: 'Laptop Computer',
      slug: 'laptop-computer',
      description: 'High performance laptop',
      price: 999.99,
      category: PRODUCT_CATEGORIES[0],
      inventory: 10,
      lastUpdated: new Date().toISOString(),
    },
    {
      _id: '2',
      id: 'test-2',
      name: 'Wireless Mouse',
      slug: 'wireless-mouse',
      description: 'Ergonomic wireless mouse',
      price: 29.99,
      category: PRODUCT_CATEGORIES[0],
      inventory: 50,
      lastUpdated: new Date().toISOString(),
    },
    {
      _id: '3',
      id: 'test-3',
      name: 'T-Shirt',
      slug: 't-shirt',
      description: 'Cotton t-shirt',
      price: 19.99,
      category: PRODUCT_CATEGORIES[1],
      inventory: 100,
      lastUpdated: new Date().toISOString(),
    },
  ]

  it('should render search input', () => {
    render(<ProductSearch products={mockProducts} />)
    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument()
  })

  it('should display all products initially', () => {
    render(<ProductSearch products={mockProducts} />)
    expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument()
    expect(screen.getByText('T-Shirt')).toBeInTheDocument()
  })

  it('should filter products by search query', async () => {
    render(<ProductSearch products={mockProducts} />)
    
    const searchInput = screen.getByPlaceholderText(/search products/i)
    fireEvent.change(searchInput, { target: { value: 'laptop' } })
    
    await waitFor(() => {
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
      expect(screen.queryByText('Wireless Mouse')).not.toBeInTheDocument()
      expect(screen.queryByText('T-Shirt')).not.toBeInTheDocument()
    }, { timeout: 500 })
  })

  it('should show clear button when search has text', () => {
    render(<ProductSearch products={mockProducts} />)
    
    const searchInput = screen.getByPlaceholderText(/search products/i)
    fireEvent.change(searchInput, { target: { value: 'laptop' } })
    
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  })

  it('should clear search when clear button is clicked', () => {
    render(<ProductSearch products={mockProducts} />)
    
    const searchInput = screen.getByPlaceholderText(/search products/i) as HTMLInputElement
    fireEvent.change(searchInput, { target: { value: 'laptop' } })
    
    const clearButton = screen.getByRole('button', { name: /clear/i })
    fireEvent.click(clearButton)
    
    expect(searchInput.value).toBe('')
  })

  it('should display results count', () => {
    render(<ProductSearch products={mockProducts} />)
    expect(screen.getByText(/showing/i)).toBeInTheDocument()
    expect(screen.getAllByText('3')).toHaveLength(2) // Shows "3 of 3"
  })
})
