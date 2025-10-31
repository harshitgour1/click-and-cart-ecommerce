// Product categories
export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports & Outdoors',
  'Books',
  'Toys & Games',
  'Health & Beauty',
  'Food & Beverages',
] as const

export type ProductCategory = typeof PRODUCT_CATEGORIES[number]

// Inventory thresholds
export const LOW_STOCK_THRESHOLD = 10

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 100
export const MAX_PAGE_SIZE = 500

// ISR revalidation time (seconds)
export const PRODUCT_REVALIDATE_TIME = 60

// API response messages
export const API_MESSAGES = {
  PRODUCT_CREATED: 'Product created successfully',
  PRODUCT_UPDATED: 'Product updated successfully',
  PRODUCT_DELETED: 'Product deleted successfully',
  PRODUCT_NOT_FOUND: 'Product not found',
  UNAUTHORIZED: 'Unauthorized - Invalid API key',
  VALIDATION_ERROR: 'Validation error',
  SERVER_ERROR: 'Internal server error',
} as const
