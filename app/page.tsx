import { Suspense } from 'react'
import connectDB from '@/lib/db/mongodb'
import Product from '@/lib/db/models/Product'
import { Product as ProductType } from '@/types/product'
import { ProductCategory } from '@/lib/constants'
import ProductGrid from '@/components/products/ProductGrid'
import ProductSearch from '@/components/products/ProductSearch'
import ProductFilter from '@/components/products/ProductFilter'
import ProductGridLoading from '@/components/products/ProductGridLoading'

// Force static generation
export const dynamic = 'force-static'
export const revalidate = false

async function getProducts(): Promise<ProductType[]> {
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
      image: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      lastUpdated: product.lastUpdated.toISOString(),
      createdAt: product.createdAt?.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Product Catalog
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Browse our collection of {products.length} products
          </p>
        </div>

        <Suspense fallback={<ProductGridLoading />}>
          <ProductSearch products={products} />
        </Suspense>
      </div>
    </div>
  )
}
