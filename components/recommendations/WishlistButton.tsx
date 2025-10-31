'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

interface WishlistButtonProps {
  productId: string
  productName: string
}

/**
 * Client Component for interactive wishlist functionality
 * Manages wishlist state using React hooks and localStorage
 */
export default function WishlistButton({ productId, productName }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  // Load wishlist state from localStorage on mount
  useEffect(() => {
    const wishlist = getWishlist()
    setIsInWishlist(wishlist.includes(productId))
  }, [productId])

  // Get wishlist from localStorage
  const getWishlist = (): string[] => {
    if (typeof window === 'undefined') return []
    try {
      const wishlist = localStorage.getItem('wishlist')
      return wishlist ? JSON.parse(wishlist) : []
    } catch (error) {
      console.error('Error reading wishlist from localStorage:', error)
      return []
    }
  }

  // Save wishlist to localStorage
  const saveWishlist = (wishlist: string[]): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error)
    }
  }

  // Toggle wishlist state
  const handleToggleWishlist = () => {
    setIsLoading(true)
    
    // Simulate a brief delay for better UX
    setTimeout(() => {
      const wishlist = getWishlist()
      
      if (isInWishlist) {
        // Remove from wishlist
        const updatedWishlist = wishlist.filter(id => id !== productId)
        saveWishlist(updatedWishlist)
        setIsInWishlist(false)
      } else {
        // Add to wishlist
        const updatedWishlist = [...wishlist, productId]
        saveWishlist(updatedWishlist)
        setIsInWishlist(true)
      }
      
      setIsLoading(false)
      
      // Show visual feedback
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 2000)
    }, 200)
  }

  return (
    <div className="relative">
      <Button
        onClick={handleToggleWishlist}
        disabled={isLoading}
        variant={isInWishlist ? 'primary' : 'outline'}
        className="w-full transition-all duration-200"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin h-4 w-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <span className="mr-2">{isInWishlist ? '❤️' : '🤍'}</span>
            {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
          </span>
        )}
      </Button>
      
      {/* Visual feedback toast */}
      {showFeedback && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap animate-fade-in z-10">
          {isInWishlist ? '✓ Added to wishlist' : '✓ Removed from wishlist'}
        </div>
      )}
    </div>
  )
}
