'use client'

import { useState, useEffect } from 'react'
import { Product, ProductFormData } from '@/types/product'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { createProduct, updateProduct } from '@/lib/utils/api'

interface ProductFormProps {
  product?: Product | null
  onSuccess?: (product: Product) => void
  onCancel?: () => void
}

interface FormErrors {
  name?: string
  slug?: string
  description?: string
  price?: string
  category?: string
  inventory?: string
}

export function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const isEditMode = !!product
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    slug: '',
    description: '',
    price: 0,
    category: PRODUCT_CATEGORIES[0],
    inventory: 0,
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // Populate form when editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        category: product.category,
        inventory: product.inventory,
      })
    }
  }, [product])
  
  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setFormData(prev => ({
      ...prev,
      name,
      // Auto-generate slug only in create mode
      slug: isEditMode ? prev.slug : generateSlug(name),
    }))
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: undefined }))
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'inventory' ? parseFloat(value) || 0 : value,
    }))
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Product name must be at least 3 characters'
    } else if (formData.name.length > 100) {
      newErrors.name = 'Product name must be less than 100 characters'
    }
    
    // Slug validation
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required'
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens'
    }
    
    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters'
    }
    
    // Price validation
    if (formData.price < 0) {
      newErrors.price = 'Price must be a positive number'
    } else if (formData.price === 0) {
      newErrors.price = 'Price is required'
    }
    
    // Category validation
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    // Inventory validation
    if (formData.inventory < 0) {
      newErrors.inventory = 'Inventory must be a non-negative number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitMessage(null)
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      let response
      if (isEditMode && product) {
        response = await updateProduct(product.id, formData)
      } else {
        response = await createProduct(formData)
      }
      
      if (response.success && response.data) {
        setSubmitMessage({
          type: 'success',
          text: response.message || `Product ${isEditMode ? 'updated' : 'created'} successfully!`,
        })
        
        // Clear form in create mode
        if (!isEditMode) {
          setFormData({
            name: '',
            slug: '',
            description: '',
            price: 0,
            category: PRODUCT_CATEGORIES[0],
            inventory: 0,
          })
        }
        
        // Call success callback
        if (onSuccess) {
          onSuccess(response.data)
        }
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setSubmitMessage(null)
        }, 3000)
      } else {
        setSubmitMessage({
          type: 'error',
          text: response.error || 'Failed to save product',
        })
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'An unexpected error occurred',
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleReset = () => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        category: product.category,
        inventory: product.inventory,
      })
    } else {
      setFormData({
        name: '',
        slug: '',
        description: '',
        price: 0,
        category: PRODUCT_CATEGORIES[0],
        inventory: 0,
      })
    }
    setErrors({})
    setSubmitMessage(null)
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      {submitMessage && (
        <div
          className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
            submitMessage.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
          role="alert"
          aria-live="polite"
        >
          {submitMessage.text}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <Input
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleNameChange}
          error={errors.name}
          placeholder="Enter product name"
          required
        />
        
        <Input
          label="Slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          error={errors.slug}
          placeholder="product-slug"
          helperText="URL-friendly identifier (lowercase, alphanumeric, hyphens)"
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`w-full px-3 py-2 text-sm sm:text-base text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors placeholder:text-gray-400 ${
            errors.description
              ? 'border-error focus:ring-error focus:border-error bg-error-50'
              : 'border-gray-300 focus:ring-saffron-500 focus:border-saffron-500 bg-white'
          }`}
          placeholder="Enter product description"
          required
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'description-error' : undefined}
        />
        {errors.description && (
          <p id="description-error" className="mt-1 text-sm text-error">{errors.description}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <Input
          label="Price (₹)"
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={handleChange}
          error={errors.price}
          placeholder="0.00"
          required
        />
        
        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
          options={PRODUCT_CATEGORIES.map(cat => ({ value: cat, label: cat }))}
          required
        />
        
        <Input
          label="Inventory"
          name="inventory"
          type="number"
          min="0"
          value={formData.inventory}
          onChange={handleChange}
          error={errors.inventory}
          placeholder="0"
          required
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
        <Button type="submit" variant="primary" isLoading={isSubmitting} className="w-full sm:w-auto">
          {isEditMode ? 'Update Product' : 'Create Product'}
        </Button>
        
        <Button type="button" variant="outline" onClick={handleReset} disabled={isSubmitting} className="w-full sm:w-auto">
          Reset
        </Button>
        
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting} className="w-full sm:w-auto">
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
