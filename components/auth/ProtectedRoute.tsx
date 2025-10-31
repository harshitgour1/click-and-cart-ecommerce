'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import { MandalaSpinner } from '@/components/ui/MandalaSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'superadmin'
  redirectTo?: string
}

/**
 * ProtectedRoute component
 * Wraps pages that require authentication
 * Automatically redirects to login if user is not authenticated
 */
export function ProtectedRoute({ 
  children, 
  requiredRole,
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    // Wait for auth check to complete
    if (isLoading) return

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push(redirectTo)
      return
    }

    // Check role-based access if required
    if (requiredRole && user?.role !== requiredRole) {
      // User doesn't have required role
      router.push('/unauthorized')
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router, redirectTo])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-saffron-50 via-neutral-50 to-royalBlue-50">
        <div className="text-center">
          <MandalaSpinner size="lg" />
          <p className="mt-4 text-neutral-600 font-medium">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null
  }

  // Check role-based access
  if (requiredRole && user?.role !== requiredRole) {
    return null
  }

  // Render protected content
  return <>{children}</>
}
