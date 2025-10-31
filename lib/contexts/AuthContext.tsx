'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface AdminUser {
  id: string
  email: string
  username: string
  name: string
  role: 'admin' | 'superadmin'
}

interface AuthContextType {
  user: AdminUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  /**
   * Check authentication status
   */
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setUser(data.data)
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Error checking authentication:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Login function
   */
  const login = useCallback(async (email: string, password: string, rememberMe = false) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, rememberMe }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      if (data.success && data.data) {
        setUser(data.data)
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (error) {
      setUser(null)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Logout function
   */
  const logout = useCallback(async () => {
    try {
      setIsLoading(true)
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setUser(null)
    } catch (error) {
      console.error('Error during logout:', error)
      // Clear user state even if API call fails
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    logout,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Hook to use auth context
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
