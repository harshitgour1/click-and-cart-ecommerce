'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

interface ProductDetailEnhancedProps {
  product: Product
}

export default function ProductDetailEnhanced({ product }: ProductDetailEnhancedProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const isOutOfStock = product.inventory === 0
  const isLowStock = product.inventory > 0 && product.inventory < 10

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false)
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    }, 500)
  }

  const handleBuyNow = () => {
    // Redirect to checkout
    window.location.href = '/cart'
  }

  const increaseQuantity = () => {
    if (quantity < product.inventory) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(product.price)

  const totalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(product.price * quantity)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center space-x-2 text-gray-600">
          <li>
            <Link href="/" className="hover:text-saffron-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/" className="hover:text-saffron-600">
              Products
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mb-6 bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded relative">
          ✓ Product added to cart successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <Card className="overflow-hidden">
            <div className="relative w-full aspect-square bg-gray-100">
              <Image
                src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Card>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="info" className="mb-3">
              {product.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Price */}
          <div className="border-t border-b py-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">{formattedPrice}</span>
              <span className="text-lg text-gray-500 line-through">
                ₹{(product.price * 1.2).toFixed(2)}
              </span>
              <Badge variant="error">20% OFF</Badge>
            </div>
            <p className="text-sm text-emerald-600 mt-2">Inclusive of all taxes</p>
          </div>

          {/* Stock Status */}
          <div>
            <Badge variant={isOutOfStock ? 'error' : isLowStock ? 'warning' : 'success'}>
              {isOutOfStock
                ? '✗ Out of Stock'
                : isLowStock
                ? `⚠ Only ${product.inventory} left`
                : `✓ ${product.inventory} in stock`}
            </Badge>
          </div>

          {/* Quantity Selector */}
          {!isOutOfStock && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 text-lg font-semibold border-x">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= product.inventory}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  Total: <span className="font-bold text-gray-900">{totalPrice}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {!isOutOfStock && (
              <>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  isLoading={isAddingToCart}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  }
                >
                  Add to Cart
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={handleBuyNow}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  }
                >
                  Buy Now
                </Button>
              </>
            )}
            {isOutOfStock && (
              <Button variant="outline" size="lg" className="w-full" disabled>
                Out of Stock
              </Button>
            )}
          </div>

          {/* Features */}
          <Card className="bg-saffron-50 border-saffron-200">
            <div className="p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free delivery on orders above ₹1000</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>7-day easy returns & exchanges</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>100% authentic products</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
