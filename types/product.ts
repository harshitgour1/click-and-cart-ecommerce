import { ProductCategory } from '@/lib/constants'

export interface Product {
  _id: string
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: ProductCategory
  inventory: number
  image?: string
  lastUpdated: string
  createdAt?: string
  updatedAt?: string
}

export interface ProductFormData {
  name: string
  slug: string
  description: string
  price: number
  category: ProductCategory
  inventory: number
}

export interface DashboardStats {
  totalProducts: number
  lowStockCount: number
  categories: string[]
  totalValue: number
}
