import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ApiResponse } from '@/types/api'

/**
 * POST /api/auth/logout
 * Clear admin session and logout
 */
export async function POST(request: NextRequest) {
  try {
    // Clear session cookie
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')

    const response: ApiResponse<null> = {
      success: true,
      message: 'Logout successful',
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error: any) {
    console.error('Error during logout:', error)
    
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'SERVER_ERROR',
      message: error.message || 'Failed to process logout',
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}
