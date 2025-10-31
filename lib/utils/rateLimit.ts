import { NextRequest } from 'next/server'

/**
 * Rate Limiting Utility
 * 
 * Implements in-memory rate limiting for API routes to prevent abuse.
 * In production, consider using Redis or a similar distributed cache
 * for rate limiting across multiple server instances.
 * 
 * Features:
 * - Configurable time windows and request limits
 * - Different limits for read vs write operations
 * - Automatic cleanup of expired entries
 * - Rate limit headers in responses
 * - IP-based and API key-based identification
 */

interface RateLimitConfig {
  interval: number // Time window in milliseconds
  uniqueTokenPerInterval: number // Max requests per interval
}

interface RateLimitStore {
  count: number
  resetTime: number
}

// In-memory store for rate limiting
// In production, consider using Redis or similar
const rateLimitStore = new Map<string, RateLimitStore>()

/**
 * Rate limiting middleware for API routes
 * @param request - Next.js request object
 * @param config - Rate limit configuration
 * @returns Object with limited flag and remaining requests
 */
export function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = {
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 10, // 10 requests per minute
  }
): { limited: boolean; remaining: number; resetTime: number } {
  // Get identifier (IP address or API key)
  const identifier = getIdentifier(request)
  const now = Date.now()

  // Get or create rate limit entry
  let rateLimitEntry = rateLimitStore.get(identifier)

  // Reset if interval has passed
  if (!rateLimitEntry || now > rateLimitEntry.resetTime) {
    rateLimitEntry = {
      count: 0,
      resetTime: now + config.interval,
    }
    rateLimitStore.set(identifier, rateLimitEntry)
  }

  // Increment request count
  rateLimitEntry.count++

  // Check if limit exceeded
  const limited = rateLimitEntry.count > config.uniqueTokenPerInterval
  const remaining = Math.max(0, config.uniqueTokenPerInterval - rateLimitEntry.count)

  return {
    limited,
    remaining,
    resetTime: rateLimitEntry.resetTime,
  }
}

/**
 * Get unique identifier for rate limiting
 * Uses API key if present, otherwise falls back to IP address
 */
function getIdentifier(request: NextRequest): string {
  // Try to get API key first
  const apiKey = request.headers.get('x-api-key')
  if (apiKey) {
    return `key:${apiKey}`
  }

  // Fall back to IP address
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : request.ip || 'unknown'
  return `ip:${ip}`
}

/**
 * Get rate limit error response
 */
export function getRateLimitErrorResponse(resetTime: number) {
  const resetDate = new Date(resetTime)
  return {
    success: false,
    error: 'Too many requests',
    message: 'Rate limit exceeded. Please try again later.',
    retryAfter: Math.ceil((resetTime - Date.now()) / 1000), // seconds until reset
    resetAt: resetDate.toISOString(),
  }
}

/**
 * Clean up expired entries from rate limit store
 * Should be called periodically to prevent memory leaks
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

// Cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000)
}

/**
 * Rate limit configurations for different endpoint types
 */
export const RATE_LIMIT_CONFIGS = {
  // Strict limit for write operations (POST, PUT, DELETE)
  WRITE: {
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 10, // 10 requests per minute
  },
  // More lenient for read operations (GET)
  READ: {
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 100, // 100 requests per minute
  },
  // Very strict for authentication failures
  AUTH_FAILURE: {
    interval: 15 * 60 * 1000, // 15 minutes
    uniqueTokenPerInterval: 5, // 5 attempts per 15 minutes
  },
} as const
