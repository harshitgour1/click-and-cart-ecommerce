import { ApiResponse } from '@/types/api'
import { Product, ProductFormData } from '@/types/product'

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || ''

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean
  retries?: number
}

/**
 * Make an API request with error handling and retry logic
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { requiresAuth = false, retries = 1, ...fetchOptions } = options
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  }
  
  // Add API key for authenticated requests
  if (requiresAuth) {
    const apiKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY
    if (apiKey) {
      headers['x-api-key'] = apiKey
    }
  }
  
  let lastError: Error | null = null
  
  // Retry logic
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...fetchOptions,
        headers,
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        return {
          success: false,
          error: data.error || `Request failed with status ${response.status}`,
        }
      }
      
      return data
    } catch (error) {
      lastError = error as Error
      
      // Don't retry on last attempt
      if (attempt < retries) {
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
      }
    }
  }
  
  return {
    success: false,
    error: lastError?.message || 'Network error occurred',
  }
}

/**
 * Fetch all products
 */
export async function getProducts(): Promise<ApiResponse<Product[]>> {
  return apiRequest<Product[]>('/api/products', {
    method: 'GET',
  })
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<ApiResponse<Product>> {
  return apiRequest<Product>(`/api/products/${slug}`, {
    method: 'GET',
  })
}

/**
 * Create a new product
 */
export async function createProduct(data: ProductFormData): Promise<ApiResponse<Product>> {
  return apiRequest<Product>('/api/products', {
    method: 'POST',
    body: JSON.stringify(data),
    requiresAuth: true,
    retries: 2,
  })
}

/**
 * Update an existing product
 */
export async function updateProduct(
  id: string,
  data: Partial<ProductFormData>
): Promise<ApiResponse<Product>> {
  return apiRequest<Product>(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    requiresAuth: true,
    retries: 2,
  })
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/api/products/${id}`, {
    method: 'DELETE',
    requiresAuth: true,
  })
}
