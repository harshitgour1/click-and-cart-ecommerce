import { describe, it, expect } from 'vitest'
import { validateProductData, validatePartialProductData } from '../validation'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

describe('validateProductData', () => {
  const validProduct = {
    name: 'Test Product',
    slug: 'test-product',
    description: 'This is a test product description',
    price: 29.99,
    category: PRODUCT_CATEGORIES[0],
    inventory: 100,
  }

  it('should return no errors for valid product data', () => {
    const errors = validateProductData(validProduct)
    expect(errors).toHaveLength(0)
  })

  it('should validate name is required', () => {
    const errors = validateProductData({ ...validProduct, name: '' })
    expect(errors).toContainEqual({ field: 'name', message: 'Name is required' })
  })

  it('should validate name minimum length', () => {
    const errors = validateProductData({ ...validProduct, name: 'ab' })
    expect(errors).toContainEqual({ field: 'name', message: 'Name must be at least 3 characters' })
  })

  it('should validate name maximum length', () => {
    const longName = 'a'.repeat(101)
    const errors = validateProductData({ ...validProduct, name: longName })
    expect(errors).toContainEqual({ field: 'name', message: 'Name must not exceed 100 characters' })
  })

  it('should validate slug is required', () => {
    const errors = validateProductData({ ...validProduct, slug: '' })
    expect(errors).toContainEqual({ field: 'slug', message: 'Slug is required' })
  })

  it('should validate slug format', () => {
    const errors = validateProductData({ ...validProduct, slug: 'Invalid Slug!' })
    expect(errors).toContainEqual({
      field: 'slug',
      message: 'Slug must be lowercase alphanumeric with hyphens only',
    })
  })

  it('should validate description is required', () => {
    const errors = validateProductData({ ...validProduct, description: '' })
    expect(errors).toContainEqual({ field: 'description', message: 'Description is required' })
  })

  it('should validate description minimum length', () => {
    const errors = validateProductData({ ...validProduct, description: 'short' })
    expect(errors).toContainEqual({
      field: 'description',
      message: 'Description must be at least 10 characters',
    })
  })

  it('should validate price is required', () => {
    const errors = validateProductData({ ...validProduct, price: undefined as any })
    expect(errors).toContainEqual({ field: 'price', message: 'Price is required' })
  })

  it('should validate price is non-negative', () => {
    const errors = validateProductData({ ...validProduct, price: -10 })
    expect(errors).toContainEqual({ field: 'price', message: 'Price must be a non-negative number' })
  })

  it('should validate price decimal places', () => {
    const errors = validateProductData({ ...validProduct, price: 29.999 })
    expect(errors).toContainEqual({ field: 'price', message: 'Price must have at most 2 decimal places' })
  })

  it('should validate category is required', () => {
    const errors = validateProductData({ ...validProduct, category: '' as any })
    expect(errors).toContainEqual({ field: 'category', message: 'Category is required' })
  })

  it('should validate category is valid', () => {
    const errors = validateProductData({ ...validProduct, category: 'Invalid Category' as any })
    expect(errors.some(e => e.field === 'category')).toBe(true)
  })

  it('should validate inventory is required', () => {
    const errors = validateProductData({ ...validProduct, inventory: undefined as any })
    expect(errors).toContainEqual({ field: 'inventory', message: 'Inventory is required' })
  })

  it('should validate inventory is non-negative', () => {
    const errors = validateProductData({ ...validProduct, inventory: -5 })
    expect(errors).toContainEqual({
      field: 'inventory',
      message: 'Inventory must be a non-negative number',
    })
  })

  it('should validate inventory is an integer', () => {
    const errors = validateProductData({ ...validProduct, inventory: 10.5 })
    expect(errors).toContainEqual({ field: 'inventory', message: 'Inventory must be an integer' })
  })
})

describe('validatePartialProductData', () => {
  it('should return no errors for empty partial data', () => {
    const errors = validatePartialProductData({})
    expect(errors).toHaveLength(0)
  })

  it('should validate only provided fields', () => {
    const errors = validatePartialProductData({ name: 'ab' })
    expect(errors).toContainEqual({ field: 'name', message: 'Name must be at least 3 characters' })
  })

  it('should not validate missing fields', () => {
    const errors = validatePartialProductData({ price: 29.99 })
    expect(errors).toHaveLength(0)
  })

  it('should validate slug format when provided', () => {
    const errors = validatePartialProductData({ slug: 'Invalid Slug!' })
    expect(errors).toContainEqual({
      field: 'slug',
      message: 'Slug must be lowercase alphanumeric with hyphens only',
    })
  })
})
