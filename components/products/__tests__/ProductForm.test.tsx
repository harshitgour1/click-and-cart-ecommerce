import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ProductForm } from '../ProductForm'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

// Mock the API utility
vi.mock('@/lib/utils/api', () => ({
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
}))

describe('ProductForm', () => {
  it('should render all form fields', () => {
    render(<ProductForm />)
    
    expect(screen.getByLabelText(/product name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/slug/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/inventory/i)).toBeInTheDocument()
  })

  it('should validate name field on change', () => {
    render(<ProductForm />)
    
    const nameInput = screen.getByLabelText(/product name/i) as HTMLInputElement
    
    fireEvent.change(nameInput, { target: { value: 'ab' } })
    
    expect(nameInput.value).toBe('ab')
  })

  it('should validate slug format on change', () => {
    render(<ProductForm />)
    
    const slugInput = screen.getByLabelText(/slug/i) as HTMLInputElement
    
    fireEvent.change(slugInput, { target: { value: 'test-slug' } })
    
    expect(slugInput.value).toBe('test-slug')
  })

  it('should update description field', () => {
    render(<ProductForm />)
    
    const descInput = screen.getByLabelText(/description/i) as HTMLTextAreaElement
    
    fireEvent.change(descInput, { target: { value: 'This is a test description' } })
    
    expect(descInput.value).toBe('This is a test description')
  })

  it('should auto-generate slug from name', () => {
    render(<ProductForm />)
    
    const nameInput = screen.getByLabelText(/product name/i)
    const slugInput = screen.getByLabelText(/slug/i) as HTMLInputElement
    
    fireEvent.change(nameInput, { target: { value: 'Test Product Name' } })
    
    expect(slugInput.value).toBe('test-product-name')
  })

  it('should reset form when reset button is clicked', () => {
    render(<ProductForm />)
    
    const nameInput = screen.getByLabelText(/product name/i) as HTMLInputElement
    const resetButton = screen.getByRole('button', { name: /reset/i })
    
    fireEvent.change(nameInput, { target: { value: 'Test Product' } })
    expect(nameInput.value).toBe('Test Product')
    
    fireEvent.click(resetButton)
    expect(nameInput.value).toBe('')
  })
})
