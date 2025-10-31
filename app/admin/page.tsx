'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import { ProductForm } from '@/components/products/ProductForm'
import { ProductList } from '@/components/products/ProductList'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Button } from '@/components/ui/Button'

type TabType = 'create' | 'manage'

function AdminPageContent() {
  const { logout, user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('create')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    // Clear editing product when switching tabs
    if (tab === 'create') {
      setEditingProduct(null)
    }
  }
  
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setActiveTab('create')
  }
  
  const handleFormSuccess = () => {
    // Trigger refresh of product list
    setRefreshTrigger(prev => prev + 1)
    
    // If we were editing, switch back to manage tab
    if (editingProduct) {
      setEditingProduct(null)
      setActiveTab('manage')
    }
  }
  
  const handleCancelEdit = () => {
    setEditingProduct(null)
  }
  
  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Manage your product catalog - create new products and update existing ones
            </p>
            {user && (
              <p className="mt-1 text-xs text-gray-500">
                Logged in as: {user.email}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              leftIcon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z" clipRule="evenodd" />
                </svg>
              }
            >
              Logout
            </Button>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="mb-4 sm:mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto" aria-label="Tabs">
              <button
                onClick={() => handleTabChange('create')}
                className={`
                  whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm
                  transition-colors duration-200 flex items-center gap-1 sm:gap-2
                  ${
                    activeTab === 'create'
                      ? 'border-saffron-500 text-saffron-700'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }
                `}
                aria-current={activeTab === 'create' ? 'page' : undefined}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>{editingProduct ? 'Edit Product' : 'Create Product'}</span>
              </button>
              
              <button
                onClick={() => handleTabChange('manage')}
                className={`
                  whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm
                  transition-colors duration-200 flex items-center gap-1 sm:gap-2
                  ${
                    activeTab === 'manage'
                      ? 'border-saffron-500 text-saffron-700'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }
                `}
                aria-current={activeTab === 'manage' ? 'page' : undefined}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                <span>Manage Products</span>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="space-y-4 sm:space-y-6">
          {activeTab === 'create' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Create New Product'}
                </CardTitle>
                {editingProduct && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Make changes to the product and click &quot;Update Product&quot; to save
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <ProductForm
                  product={editingProduct}
                  onSuccess={handleFormSuccess}
                  onCancel={editingProduct ? handleCancelEdit : undefined}
                />
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'manage' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Product Catalog</CardTitle>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  View and edit all products in your catalog
                </p>
              </CardHeader>
              <CardContent>
                <ProductList
                  onEdit={handleEditProduct}
                  refreshTrigger={refreshTrigger}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminPageContent />
    </ProtectedRoute>
  )
}
