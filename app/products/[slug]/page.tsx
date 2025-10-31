import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import connectDB from '@/lib/db/mongodb'
import Product from '@/lib/db/models/Product'
import { Product as ProductType } from '@/types/product'
import { ProductCategory } from '@/lib/constants'
import ProductDetailEnhanced from '@/components/products/ProductDetailEnhanced'
import { MandalaSpinner } from '@/components/ui/MandalaSpinner'

// Configure ISR with 60 second revalidation
export const revalidate = 60

// Enable dynamic generation for products created after build
export const dynamicParams = true

// Generate static params for all products at build time
// Products not in this list will be generated on-demand when first requested
export async function generateStaticParams() {
  try {
    await connectDB()
    const products = await Product.find({}).select('slug').lean().exec()
    
    return products.map((product) => ({
      slug: product.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Fetch product data by slug
async function getProductBySlug(slug: string): Promise<ProductType | null> {
  try {
    await connectDB()
    const product = await Product.findOne({ slug }).lean().exec()
    
    if (!product) {
      return null
    }
    
    // Convert MongoDB document to plain object with string dates
    return {
      _id: product._id.toString(),
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      category: product.category as ProductCategory,
      inventory: product.inventory,
      image: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
      lastUpdated: product.lastUpdated.toISOString(),
      createdAt: product.createdAt?.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }
  
  return {
    title: `${product.name} | Product Details`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  
  // Return 404 if product doesn't exist
  if (!product) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense
        fallback={
          <div className="flex flex-col justify-center items-center min-h-screen">
            <MandalaSpinner size="lg" />
            <p className="mt-4 text-gray-600 animate-pulse">Loading product details...</p>
          </div>
        }
      >
        <ProductDetailEnhanced product={product} />
      </Suspense>
    </div>
  )
}
