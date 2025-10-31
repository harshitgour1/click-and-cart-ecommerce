import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db/mongodb'
import Product from '@/lib/db/models/Product'
import { ApiResponse } from '@/types/api'
import { Product as ProductType, ProductFormData } from '@/types/product'
import { API_MESSAGES } from '@/lib/constants'
import { revalidatePath } from 'next/cache'
import { authenticateRequest, authenticateAdmin, getAuthErrorResponse } from '@/lib/utils/auth'
import { validatePartialProductData } from '@/lib/utils/validation'
import { rateLimit, getRateLimitErrorResponse, RATE_LIMIT_CONFIGS } from '@/lib/utils/rateLimit'

/**
 * GET /api/products/[slug]
 * Fetch a single product by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Apply rate limiting for read operations
    const rateLimitResult = rateLimit(request, RATE_LIMIT_CONFIGS.READ)
    if (rateLimitResult.limited) {
      return NextResponse.json(
        getRateLimitErrorResponse(rateLimitResult.resetTime),
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(RATE_LIMIT_CONFIGS.READ.uniqueTokenPerInterval),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.resetTime),
          }
        }
      )
    }

    await connectDB()

    const { slug } = params

    // Find product by slug
    const product = await Product.findOne({ slug }).lean().exec()

    if (!product) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: API_MESSAGES.PRODUCT_NOT_FOUND,
        message: `Product with slug "${slug}" not found`,
      }
      return NextResponse.json(errorResponse, { status: 404 })
    }

    // Transform MongoDB document to API format
    const transformedProduct: ProductType = {
      _id: product._id.toString(),
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      category: product.category as any,
      inventory: product.inventory,
      lastUpdated: product.lastUpdated.toISOString(),
      createdAt: product.createdAt?.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }

    const response: ApiResponse<ProductType> = {
      success: true,
      data: transformedProduct,
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Error fetching product:', error)
    
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: API_MESSAGES.SERVER_ERROR,
      message: error.message || 'Failed to fetch product',
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}

/**
 * PUT /api/products/[slug]
 * Update an existing product by slug or id (requires authentication)
 * Note: The slug parameter can be either a slug or an id
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Apply rate limiting for write operations
    const rateLimitResult = rateLimit(request, RATE_LIMIT_CONFIGS.WRITE)
    if (rateLimitResult.limited) {
      return NextResponse.json(
        getRateLimitErrorResponse(rateLimitResult.resetTime),
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(RATE_LIMIT_CONFIGS.WRITE.uniqueTokenPerInterval),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.resetTime),
          }
        }
      )
    }

    // Authenticate request (supports both API key and session)
    if (!(await authenticateAdmin(request))) {
      return NextResponse.json(getAuthErrorResponse(), { status: 401 })
    }

    await connectDB()

    const { slug: identifier } = params

    // Parse request body
    const body: Partial<ProductFormData> = await request.json()

    // Validate request body
    const validationErrors = validatePartialProductData(body)
    if (validationErrors.length > 0) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: API_MESSAGES.VALIDATION_ERROR,
        message: 'Invalid product data',
        // @ts-ignore - adding details for validation errors
        details: validationErrors,
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    // Try to find product by id first, then by slug
    let existingProduct = await Product.findOne({ id: identifier })
    if (!existingProduct) {
      existingProduct = await Product.findOne({ slug: identifier })
    }

    if (!existingProduct) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: API_MESSAGES.PRODUCT_NOT_FOUND,
        message: `Product with identifier "${identifier}" not found`,
      }
      return NextResponse.json(errorResponse, { status: 404 })
    }

    // If slug is being updated, check if new slug already exists
    if (body.slug && body.slug !== existingProduct.slug) {
      const slugExists = await Product.findOne({ slug: body.slug })
      if (slugExists) {
        const errorResponse: ApiResponse<null> = {
          success: false,
          error: API_MESSAGES.VALIDATION_ERROR,
          message: `Product with slug "${body.slug}" already exists`,
        }
        return NextResponse.json(errorResponse, { status: 400 })
      }
    }

    // Update product and set lastUpdated timestamp
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: existingProduct._id },
      {
        ...body,
        lastUpdated: new Date(),
      },
      {
        new: true, // Return updated document
        runValidators: true, // Run schema validators
      }
    )

    if (!updatedProduct) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: API_MESSAGES.PRODUCT_NOT_FOUND,
        message: `Product with identifier "${identifier}" not found`,
      }
      return NextResponse.json(errorResponse, { status: 404 })
    }

    // Transform MongoDB document to API format
    const transformedProduct: ProductType = {
      _id: (updatedProduct._id as any).toString(),
      id: updatedProduct.id,
      name: updatedProduct.name,
      slug: updatedProduct.slug,
      description: updatedProduct.description,
      price: updatedProduct.price,
      category: updatedProduct.category as any,
      inventory: updatedProduct.inventory,
      lastUpdated: updatedProduct.lastUpdated.toISOString(),
      createdAt: updatedProduct.createdAt?.toISOString(),
      updatedAt: updatedProduct.updatedAt?.toISOString(),
    }

    // Trigger on-demand revalidation for product detail page and home page
    revalidatePath(`/products/${updatedProduct.slug}`)
    revalidatePath('/')

    const response: ApiResponse<ProductType> = {
      success: true,
      data: transformedProduct,
      message: API_MESSAGES.PRODUCT_UPDATED,
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Error updating product:', error)
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0]
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: API_MESSAGES.VALIDATION_ERROR,
        message: `Product with this ${field} already exists`,
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => ({
        field: err.path,
        message: err.message,
      }))
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: API_MESSAGES.VALIDATION_ERROR,
        message: 'Invalid product data',
        // @ts-ignore - adding details for validation errors
        details: validationErrors,
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const errorResponse: ApiResponse<null> = {
      success: false,
      error: API_MESSAGES.SERVER_ERROR,
      message: error.message || 'Failed to update product',
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}
