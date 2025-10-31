'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PatternBackground } from '@/lib/patterns/indian-patterns'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await login(email, password, rememberMe)
      router.push('/admin')
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-saffron-50 via-neutral-50 to-royalBlue-50 py-12 px-4 sm:px-6 lg:px-8">
      <PatternBackground pattern="mandala" className="absolute inset-0 text-saffron-500" />
      
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lift p-8 sm:p-10 border border-neutral-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-saffron-gradient rounded-full mb-4 shadow-indian">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-neutral-800 font-heading">Admin Login</h1>
            <p className="mt-2 text-neutral-600">Sign in to access the admin panel</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-50 border-l-4 border-error-500 rounded-lg animate-shake">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-error-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-sm text-error-700">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="email"
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={isLoading}
            />

            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={isLoading}
            />

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-saffron-600 focus:ring-saffron-500 border-neutral-300 rounded cursor-pointer"
                disabled={isLoading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full" withPattern>
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">Default credentials: admin@example.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
