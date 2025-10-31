import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { GET, PUT } from '../route'
import { NextRequest } from 'next/server'
import { connectTestDB, disconnectTestDB, clearTestDB } from '@/lib/db/__tests__/testDb'
import Product from '@/lib/db/models/Product'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

describe('GET /api/products/[slug]', () => {
  beforeAll(async () => {
    await connectTestDB()
  })

  afterAll(async () => {
    await disconnectTestDB()
  })

  beforeEach(async () => {
    await clearTestDB()
  })

  it('should return a single product by slug', async () => {
    await Product.create({
      id: 'test-1',
      name: 'Test Product',
      slug: 'test-product',
      description: 'Test product description',
      price: 29.99,
      category: PRODUCT_CATEGORIES[0],
      inventory: 100,
    })

    const request = new NextRequest('http://localhost:3000/api/products/test-product')
    const response = await GET(request, { params: { slug: 'test-product' } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.name).toBe('Test Product')
    expect(data.data.slug).toBe('test-product')
  })

  it('should return 404 for non-existent product', async () => {
    const request = new NextRequest('http://localhost:3000/api/products/non-existent')
    const response = await GET(request, { params: { slug: 'non-existent' } })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
  })
})

describe('PUT /api/products/[slug]', () => {
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

  it('should update an existing product', async () => {
    const product = await Product.create({
      id: 'test-1',
      name: 'Original Product',
      slug: 'original-product',
      description: 'Original description',
      price: 29.99,
      category: PRODUCT_CATEGORIES[0],
      inventory: 100,
    })

    const updateData = {
      name: 'Updated Product',
      price: 39.99,
    }

    const request = new NextRequest('http://localhost:3000/api/products/test-1', {
      method: 'PUT',
      headers: {
        'x-api-key': 'test-api-key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })

    const response = await PUT(request, { params: { slug: 'test-1' } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.name).toBe('Updated Product')
    expect(data.data.price).toBe(39.99)
  })

  it('should block unauthorized update requests', async () => {
    await Product.create({
      id: 'test-1',
      name: 'Test Product',
      slug: 'test-product',
      description: 'Test description',
      price: 29.99,
      category: PRODUCT_CATEGORIES[0],
      inventory: 100,
    })

    const updateData = {
      name: 'Updated Product',
    }

    const request = new NextRequest('http://localhost:3000/api/products/test-1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })

    const response = await PUT(request, { params: { slug: 'test-1' } })
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
  })

  it('should return 404 when updating non-existent product', async () => {
    const updateData = {
      name: 'Updated Product',
    }

    const request = new NextRequest('http://localhost:3000/api/products/non-existent', {
      method: 'PUT',
      headers: {
        'x-api-key': 'test-api-key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })

    const response = await PUT(request, { params: { slug: 'non-existent' } })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
  })
})
