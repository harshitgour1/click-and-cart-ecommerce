import connectDB from '@/lib/db/mongodb'
import Product from '@/lib/db/models/Product'
import { DashboardStats, Product as ProductType } from '@/types/product'
import { ProductCategory } from '@/lib/constants'
import StatsCard from '@/components/dashboard/StatsCard'
import InventoryTable from '@/components/dashboard/InventoryTable'

// Force Server-Side Rendering - disable static optimization
export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * Calculate dashboard statistics from database
 */
async function getDashboardStats(): Promise<DashboardStats> {
  try {
    await connectDB()
    
    // Fetch all products
    const products = await Product.find({}).lean().exec()
    
    // Calculate statistics
    const totalProducts = products.length
    const lowStockCount = products.filter(p => p.inventory < 10).length
    const categorySet = new Set(products.map(p => p.category))
    const categories = Array.from(categorySet)
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.inventory), 0)
    
    return {
      totalProducts,
      lowStockCount,
      categories,
      totalValue,
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return {
      totalProducts: 0,
      lowStockCount: 0,
      categories: [],
      totalValue: 0,
    }
  }
}

/**
 * Fetch all products for inventory table
 */
async function getInventoryProducts(): Promise<ProductType[]> {
  try {
    await connectDB()
    const products = await Product.find({}).lean().exec()
    
    // Convert MongoDB documents to plain objects with string dates
    return products.map((product) => ({
      _id: product._id.toString(),
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      category: product.category as ProductCategory,
      inventory: product.inventory,
      lastUpdated: product.lastUpdated.toISOString(),
      createdAt: product.createdAt?.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }))
  } catch (error) {
    console.error('Error fetching inventory products:', error)
    return []
  }
}

export default async function DashboardPage() {
  // Fetch data on every request (SSR)
  const stats = await getDashboardStats()
  const products = await getInventoryProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Inventory Dashboard
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Real-time inventory monitoring and statistics
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatsCard
            title="Total Products"
            value={stats.totalProducts}
            icon="📦"
            color="blue"
          />
          <StatsCard
            title="Low Stock Items"
            value={stats.lowStockCount}
            icon="⚠️"
            color="amber"
            subtitle="Less than 10 units"
          />
          <StatsCard
            title="Categories"
            value={stats.categories.length}
            icon="📂"
            color="green"
          />
          <StatsCard
            title="Total Inventory Value"
            value={`$${stats.totalValue.toFixed(2)}`}
            icon="💰"
            color="purple"
          />
        </div>

        {/* Inventory Table */}
        <InventoryTable products={products} />
      </div>
    </div>
  )
}
