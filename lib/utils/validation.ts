import { ProductFormData } from '@/types/product'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

export interface ValidationError {
  field: string
  message: string
}

/**
 * Validate product form data
 * @param data - Product form data to validate
 * @returns Array of validation errors (empty if valid)
 */
export function validateProductData(data: Partial<ProductFormData>): ValidationError[] {
  const errors: ValidationError[] = []

  // Validate name
  if (!data.name || typeof data.name !== 'string') {
    errors.push({ field: 'name', message: 'Name is required' })
  } else if (data.name.trim().length < 3) {
    errors.push({ field: 'name', message: 'Name must be at least 3 characters' })
  } else if (data.name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name must not exceed 100 characters' })
  }

  // Validate slug
  if (!data.slug || typeof data.slug !== 'string') {
    errors.push({ field: 'slug', message: 'Slug is required' })
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
    errors.push({
      field: 'slug',
      message: 'Slug must be lowercase alphanumeric with hyphens only',
    })
  }

  // Validate description
  if (!data.description || typeof data.description !== 'string') {
    errors.push({ field: 'description', message: 'Description is required' })
  } else if (data.description.trim().length < 10) {
    errors.push({ field: 'description', message: 'Description must be at least 10 characters' })
  } else if (data.description.trim().length > 1000) {
    errors.push({ field: 'description', message: 'Description must not exceed 1000 characters' })
  }

  // Validate price
  if (data.price === undefined || data.price === null) {
    errors.push({ field: 'price', message: 'Price is required' })
  } else if (typeof data.price !== 'number' || isNaN(data.price)) {
    errors.push({ field: 'price', message: 'Price must be a valid number' })
  } else if (data.price < 0) {
    errors.push({ field: 'price', message: 'Price must be a non-negative number' })
  } else if (!/^\d+(\.\d{1,2})?$/.test(data.price.toString())) {
    errors.push({ field: 'price', message: 'Price must have at most 2 decimal places' })
  }

  // Validate category
  if (!data.category || typeof data.category !== 'string') {
    errors.push({ field: 'category', message: 'Category is required' })
  } else if (!PRODUCT_CATEGORIES.includes(data.category as any)) {
    errors.push({
      field: 'category',
      message: `Category must be one of: ${PRODUCT_CATEGORIES.join(', ')}`,
    })
  }

  // Validate inventory
  if (data.inventory === undefined || data.inventory === null) {
    errors.push({ field: 'inventory', message: 'Inventory is required' })
  } else if (typeof data.inventory !== 'number' || isNaN(data.inventory)) {
    errors.push({ field: 'inventory', message: 'Inventory must be a valid number' })
  } else if (data.inventory < 0) {
    errors.push({ field: 'inventory', message: 'Inventory must be a non-negative number' })
  } else if (!Number.isInteger(data.inventory)) {
    errors.push({ field: 'inventory', message: 'Inventory must be an integer' })
  }

  return errors
}

/**
 * Validate partial product data for updates
 * @param data - Partial product data to validate
 * @returns Array of validation errors (empty if valid)
 */
export function validatePartialProductData(data: Partial<ProductFormData>): ValidationError[] {
  const errors: ValidationError[] = []

  // Only validate fields that are present
  if (data.name !== undefined) {
    if (typeof data.name !== 'string') {
      errors.push({ field: 'name', message: 'Name must be a string' })
    } else if (data.name.trim().length < 3) {
      errors.push({ field: 'name', message: 'Name must be at least 3 characters' })
    } else if (data.name.trim().length > 100) {
      errors.push({ field: 'name', message: 'Name must not exceed 100 characters' })
    }
  }

  if (data.slug !== undefined) {
    if (typeof data.slug !== 'string') {
      errors.push({ field: 'slug', message: 'Slug must be a string' })
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
      errors.push({
        field: 'slug',
        message: 'Slug must be lowercase alphanumeric with hyphens only',
      })
    }
  }

  if (data.description !== undefined) {
    if (typeof data.description !== 'string') {
      errors.push({ field: 'description', message: 'Description must be a string' })
    } else if (data.description.trim().length < 10) {
      errors.push({ field: 'description', message: 'Description must be at least 10 characters' })
    } else if (data.description.trim().length > 1000) {
      errors.push({ field: 'description', message: 'Description must not exceed 1000 characters' })
    }
  }

  if (data.price !== undefined) {
    if (typeof data.price !== 'number' || isNaN(data.price)) {
      errors.push({ field: 'price', message: 'Price must be a valid number' })
    } else if (data.price < 0) {
      errors.push({ field: 'price', message: 'Price must be a non-negative number' })
    } else if (!/^\d+(\.\d{1,2})?$/.test(data.price.toString())) {
      errors.push({ field: 'price', message: 'Price must have at most 2 decimal places' })
    }
  }

  if (data.category !== undefined) {
    if (typeof data.category !== 'string') {
      errors.push({ field: 'category', message: 'Category must be a string' })
    } else if (!PRODUCT_CATEGORIES.includes(data.category as any)) {
      errors.push({
        field: 'category',
        message: `Category must be one of: ${PRODUCT_CATEGORIES.join(', ')}`,
      })
    }
  }

  if (data.inventory !== undefined) {
    if (typeof data.inventory !== 'number' || isNaN(data.inventory)) {
      errors.push({ field: 'inventory', message: 'Inventory must be a valid number' })
    } else if (data.inventory < 0) {
      errors.push({ field: 'inventory', message: 'Inventory must be a non-negative number' })
    } else if (!Number.isInteger(data.inventory)) {
      errors.push({ field: 'inventory', message: 'Inventory must be an integer' })
    }
  }

  return errors
}
