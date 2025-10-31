import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { authenticateRequest, getAuthErrorResponse } from '../auth'
import { NextRequest } from 'next/server'
import { API_MESSAGES } from '@/lib/constants'

describe('authenticateRequest', () => {
  const originalEnv = process.env.ADMIN_API_KEY

  beforeEach(() => {
    process.env.ADMIN_API_KEY = 'test-api-key-123'
  })

  afterEach(() => {
    process.env.ADMIN_API_KEY = originalEnv
  })

  it('should return true for valid API key', () => {
    const request = new NextRequest('http://localhost:3000/api/products', {
      headers: {
        'x-api-key': 'test-api-key-123',
      },
    })

    const result = authenticateRequest(request)
    expect(result).toBe(true)
  })

  it('should return false for invalid API key', () => {
    const request = new NextRequest('http://localhost:3000/api/products', {
      headers: {
        'x-api-key': 'wrong-key',
      },
    })

    const result = authenticateRequest(request)
    expect(result).toBe(false)
  })

  it('should return false when API key is missing', () => {
    const request = new NextRequest('http://localhost:3000/api/products')

    const result = authenticateRequest(request)
    expect(result).toBe(false)
  })

  it('should return false when ADMIN_API_KEY is not set', () => {
    delete process.env.ADMIN_API_KEY

    const request = new NextRequest('http://localhost:3000/api/products', {
      headers: {
        'x-api-key': 'test-api-key-123',
      },
    })

    const result = authenticateRequest(request)
    expect(result).toBe(false)
  })
})

describe('getAuthErrorResponse', () => {
  it('should return proper error response structure', () => {
    const response = getAuthErrorResponse()

    expect(response).toEqual({
      success: false,
      error: API_MESSAGES.UNAUTHORIZED,
      message: 'Valid API key required in x-api-key header',
    })
  })
})
