import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { GET, POST } from '../route'
import { NextRequest } from 'next/server'
import { connectTestDB, disconnectTestDB, clearTestDB } from '@/lib/db/__tests__/testDb'
import Product from '@/lib/db/models/Product'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

describe('GET /api/products', () => {
  beforeAll(async () => {
    await connectTestDB()
  })

  afterAll(async () => {
    await disconnectTestDB()
  })

  beforeEach(async () => {
    await clearTestDB()
  })

  it('should return all products', async () => {
    await Product.create([
      {
        id: 'test-1',
        name: 'Product 1',
        slug: 'product-1',
        description: 'Test product 1 description',
        price: 29.99,
        category: PRODUCT_CATEGORIES[0],
        inventory: 100,
      },
      {
        id: 'test-2',
        name: 'Product 2',
        slug: 'product-2',
        description: 'Test product 2 description',
        price: 49.99,
        category: PRODUCT_CATEGORIES[1],
        inventory: 50,
      },
    ])

    const request = new NextRequest('http://localhost:3000/api/products')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toHaveLength(2)
    expect(data.data[0].name).toBe('Product 2')
  })

  it('should return empty array when no products exist', async () => {
    const request = new NextRequest('http://localhost:3000/api/products')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toHaveLength(0)
  })
})

describe('POST /api/products', () => {
  const originalEnv = process.env.ADMIN_API_KEY

  beforeAll(async () => {
    await connectTestDB()
    process.env.ADMIN_API_KEY = 'test-api-key'
  })

  afterAll(async () => {
    await disconnectTestDB()
    process.env.ADMIN_API_KEY = originalEnv
  })

  beforeEach(async () => {
    await clearTestDB()
  })

  it('should create a new product with valid data', async () => {
    const productData = {
      name: 'New Product',
      slug: 'new-product',
      description: 'This is a new product',
      price: 39.99,
      category: PRODUCT_CATEGORIES[0],
      inventory: 75,
    }

    const request = new NextRequest('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'x-api-key': 'test-api-key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.data.name).toBe('New Product')
    expect(data.data.slug).toBe('new-product')
    expect(data.data.id).toBeDefined()
  })

  it('should reject invalid product data', async () => {
    const invalidData = {
      name: 'ab',
      slug: 'invalid-slug',
      description: 'short',
      price: -10,
      category: PRODUCT_CATEGORIES[0],
      inventory: 10,
    }

    const request = new NextRequest('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'x-api-key': 'test-api-key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBeDefined()
  })

  it('should block unauthorized requests', async () => {
    const productData = {
      name: 'New Product',
      slug: 'new-product',
      description: 'This is a new product',
      price: 39.99,
      category: PRODUCT_CATEGORIES[0],
      inventory: 75,
    }

    const request = new NextRequest('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
  })
})
