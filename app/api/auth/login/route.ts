import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ApiResponse } from '@/types/api'

interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

interface AdminUser {
  id: string
  email: string
  username: string
  name: string
  role: 'admin' | 'superadmin'
}

/**
 * POST /api/auth/login
 * Authenticate admin user and create session
 */
export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { email, password, rememberMe } = body

    // Validate input
    if (!email || !password) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Email and password are required',
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    // Get admin credentials from environment
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    // Validate credentials
    if (email !== adminEmail || password !== adminPassword) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password',
      }
      return NextResponse.json(errorResponse, { status: 401 })
    }

    // Create admin user object
    const adminUser: AdminUser = {
      id: 'admin-1',
      email: adminEmail,
      username: 'admin',
      name: 'Admin User',
      role: 'admin',
    }

    // Generate session token (simple implementation)
    const sessionToken = Buffer.from(
      JSON.stringify({
        userId: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        timestamp: Date.now(),
      })
    ).toString('base64')

    // Set session cookie
    const cookieStore = await cookies()
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // 30 days or 24 hours
    
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge,
      path: '/',
    })

    const response: ApiResponse<AdminUser> = {
      success: true,
      data: adminUser,
      message: 'Login successful',
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error: any) {
    console.error('Error during login:', error)
    
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'SERVER_ERROR',
      message: error.message || 'Failed to process login',
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}
