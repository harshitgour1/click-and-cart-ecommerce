import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ApiResponse } from '@/types/api'

interface AdminUser {
  id: string
  email: string
  username: string
  name: string
  role: 'admin' | 'superadmin'
}

interface SessionData {
  userId: string
  email: string
  role: string
  timestamp: number
}

/**
 * GET /api/auth/session
 * Check authentication status and return user data if authenticated
 */
export async function GET(request: NextRequest) {
  try {
    // Get session cookie
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('admin_session')?.value

    if (!sessionToken) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'NOT_AUTHENTICATED',
        message: 'No active session',
      }
      return NextResponse.json(errorResponse, { status: 401 })
    }

    // Decode and validate session token
    try {
      const sessionData: SessionData = JSON.parse(
        Buffer.from(sessionToken, 'base64').toString('utf-8')
      )

      // Check if session is expired (24 hours for regular, 30 days for remember me)
      const maxAge = 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
      const isExpired = Date.now() - sessionData.timestamp > maxAge

      if (isExpired) {
        // Clear expired session
        cookieStore.delete('admin_session')
        
        const errorResponse: ApiResponse<null> = {
          success: false,
          error: 'SESSION_EXPIRED',
          message: 'Session has expired',
        }
        return NextResponse.json(errorResponse, { status: 401 })
      }

      // Create admin user object from session
      const adminUser: AdminUser = {
        id: sessionData.userId,
        email: sessionData.email,
        username: 'admin',
        name: 'Admin User',
        role: sessionData.role as 'admin' | 'superadmin',
      }

      const response: ApiResponse<AdminUser> = {
        success: true,
        data: adminUser,
        message: 'Session valid',
      }

      return NextResponse.json(response, { status: 200 })
    } catch (decodeError) {
      // Invalid token format
      cookieStore.delete('admin_session')
      
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'INVALID_SESSION',
        message: 'Invalid session token',
      }
      return NextResponse.json(errorResponse, { status: 401 })
    }
  } catch (error: any) {
    console.error('Error checking session:', error)
    
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'SERVER_ERROR',
      message: error.message || 'Failed to check session',
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}
