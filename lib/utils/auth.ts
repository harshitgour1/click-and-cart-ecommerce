import { NextRequest } from 'next/server'
import { API_MESSAGES } from '@/lib/constants'
import { cookies } from 'next/headers'

/**
 * Authenticate API request by validating API key
 * @param request - Next.js request object
 * @returns true if authenticated, false otherwise
 */
export function authenticateRequest(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key')
  const adminApiKey = process.env.ADMIN_API_KEY

  if (!adminApiKey) {
    console.error('ADMIN_API_KEY environment variable is not set')
    return false
  }

  return apiKey === adminApiKey
}

/**
 * Get authentication error response
 */
export function getAuthErrorResponse() {
  return {
    success: false,
    error: API_MESSAGES.UNAUTHORIZED,
    message: 'Valid API key required in x-api-key header',
  }
}

/**
 * Session data structure
 */
interface SessionData {
  userId: string
  email: string
  role: string
  timestamp: number
}

/**
 * Admin user structure
 */
export interface AdminUser {
  id: string
  email: string
  username: string
  name: string
  role: 'admin' | 'superadmin'
}

/**
 * Authenticate admin session from cookie
 * @returns AdminUser if authenticated, null otherwise
 */
export async function authenticateSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('admin_session')?.value

    if (!sessionToken) {
      return null
    }

    // Decode session token
    const sessionData: SessionData = JSON.parse(
      Buffer.from(sessionToken, 'base64').toString('utf-8')
    )

    // Check if session is expired (30 days)
    const maxAge = 30 * 24 * 60 * 60 * 1000
    const isExpired = Date.now() - sessionData.timestamp > maxAge

    if (isExpired) {
      return null
    }

    // Return admin user
    return {
      id: sessionData.userId,
      email: sessionData.email,
      username: 'admin',
      name: 'Admin User',
      role: sessionData.role as 'admin' | 'superadmin',
    }
  } catch (error) {
    console.error('Error authenticating session:', error)
    return null
  }
}

/**
 * Middleware to check admin authentication for API routes
 * Supports both API key and session-based authentication
 * @param request - Next.js request object
 * @returns true if authenticated, false otherwise
 */
export async function authenticateAdmin(request: NextRequest): Promise<boolean> {
  // Check API key first (for backward compatibility)
  if (authenticateRequest(request)) {
    return true
  }
  
  // Check session authentication
  const user = await authenticateSession()
  return user !== null
}

/**
 * Get session authentication error response
 */
export function getSessionAuthErrorResponse() {
  return {
    success: false,
    error: 'UNAUTHORIZED',
    message: 'Authentication required. Please log in.',
  }
}
