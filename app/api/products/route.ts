import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db/mongodb'
import Product from '@/lib/db/models/Product'
import { ApiResponse } from '@/types/api'
import { Product as ProductType, ProductFormData } from '@/types/product'
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, API_MESSAGES } from '@/lib/constants'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'
import { authenticateRequest, authenticateAdmin, getAuthErrorResponse } from '@/lib/utils/auth'
import { validateProductData } from '@/lib/utils/validation'
import { rateLimit, getRateLimitErrorResponse, RATE_LIMIT_CONFIGS } from '@/lib/utils/rateLimit'

/**
 * GET /api/products
 * Fetch all products with optional filtering and pagination
 */
export async function GET(request: NextRequest) {
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

    // Extract query parameters
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = Math.min(
      parseInt(searchParams.get('limit') || String(DEFAULT_PAGE_SIZE)),
      MAX_PAGE_SIZE
    )
    const page = parseInt(searchParams.get('page') || '1')

    // Build query filter
    const filter: any = {}
    
    if (category) {
      filter.category = category
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Fetch products with pagination
    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      Product.countDocuments(filter),
    ])

    // Transform MongoDB documents to API format
    const transformedProducts = products.map((product: any) => ({
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
    }))

    const response: ApiResponse<any> = {
      success: true,
      data: transformedProducts,
      message: `Retrieved ${transformedProducts.length} products`,
    }

    // Add pagination metadata if applicable
    if (limit < MAX_PAGE_SIZE) {
      return NextResponse.json({
        ...response,
        total,
        page,
        limit,
      })
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Error fetching products:', error)
    
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: API_MESSAGES.SERVER_ERROR,
      message: error.message || 'Failed to fetch products',
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}

/**
 * POST /api/products
 * Create a new product (requires authentication)
 */
export async function POST(request: NextRequest) {
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

    // Parse request body
    const body: ProductFormData = await request.json()

    // Validate request body
    const validationErrors = validateProductData(body)
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

    // Check if slug already exists
    const existingProduct = await Product.findOne({ slug: body.slug })
    if (existingProduct) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: API_MESSAGES.VALIDATION_ERROR,
        message: `Product with slug "${body.slug}" already exists`,
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    // Create new product with generated ID
    const newProduct = new Product({
      id: uuidv4(),
      name: body.name,
      slug: body.slug,
      description: body.description,
      price: body.price,
      category: body.category,
      inventory: body.inventory,
      lastUpdated: new Date(),
    })

    await newProduct.save()

    // Transform MongoDB document to API format
    const transformedProduct: ProductType = {
      _id: (newProduct._id as any).toString(),
      id: newProduct.id,
      name: newProduct.name,
      slug: newProduct.slug,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category as any,
      inventory: newProduct.inventory,
      lastUpdated: newProduct.lastUpdated.toISOString(),
      createdAt: newProduct.createdAt?.toISOString(),
      updatedAt: newProduct.updatedAt?.toISOString(),
    }

    // Trigger on-demand revalidation for home page
    revalidatePath('/')

    const response: ApiResponse<ProductType> = {
      success: true,
      data: transformedProduct,
      message: API_MESSAGES.PRODUCT_CREATED,
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error: any) {
    console.error('Error creating product:', error)
    
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
      message: error.message || 'Failed to create product',
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}
