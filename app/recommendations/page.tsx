import connectDB from '@/lib/db/mongodb'
import Product from '@/lib/db/models/Product'
import { Product as ProductType } from '@/types/product'
import { ProductCategory } from '@/lib/constants'
import RecommendedProducts from '@/components/recommendations/RecommendedProducts'

// This page uses React Server Components
// No 'use client' directive - renders on the server

/**
 * Fetch recommended products based on category-based logic
 * Recommendation strategy: Get products from multiple categories with good inventory
 */
async function getRecommendedProducts(): Promise<ProductType[]> {
  try {
    await connectDB()
    
    // Fetch products with inventory > 0, sorted by inventory (descending)
    // This ensures we recommend products that are in stock
    const products = await Product.find({ inventory: { $gt: 0 } })
      .sort({ inventory: -1, createdAt: -1 })
      .limit(12) // Limit to 12 recommended products
      .lean()
      .exec()
    
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
    console.error('Error fetching recommended products:', error)
    return []
  }
}

export default async function RecommendationsPage() {
  const recommendedProducts = await getRecommendedProducts()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Recommended for You
          </h1>
          <p className="text-lg text-gray-600">
            Discover our top picks based on availability and popularity
          </p>
        </div>

        {recommendedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No recommendations available at the moment.
            </p>
          </div>
        ) : (
          <RecommendedProducts products={recommendedProducts} />
        )}
      </div>
    </main>
  )
}
