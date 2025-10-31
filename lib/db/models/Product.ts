import mongoose, { Schema, Model, Document } from 'mongoose'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { v4 as uuidv4 } from 'uuid'

export interface IProduct extends Document {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: string
  inventory: number
  image?: string
  lastUpdated: Date
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidv4(),
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [3, 'Product name must be at least 3 characters'],
      maxlength: [100, 'Product name must not exceed 100 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug must be lowercase alphanumeric with hyphens only',
      ],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [1000, 'Description must not exceed 1000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price must be a non-negative number'],
      validate: {
        validator: function (value: number) {
          // Validate max 2 decimal places
          return /^\d+(\.\d{1,2})?$/.test(value.toString())
        },
        message: 'Price must have at most 2 decimal places',
      },
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: {
        values: PRODUCT_CATEGORIES,
        message: '{VALUE} is not a valid category',
      },
    },
    inventory: {
      type: Number,
      required: [true, 'Product inventory is required'],
      min: [0, 'Inventory must be a non-negative number'],
      validate: {
        validator: Number.isInteger,
        message: 'Inventory must be an integer',
      },
    },
    image: {
      type: String,
      required: false,
      default: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
)

// Indexes for performance optimization (id and slug already indexed via unique: true)
ProductSchema.index({ category: 1 })
ProductSchema.index({ inventory: 1 })

// Pre-save hook to update lastUpdated timestamp
ProductSchema.pre('save', function (next) {
  this.lastUpdated = new Date()
  next()
})

// Pre-update hook to update lastUpdated timestamp
ProductSchema.pre('findOneAndUpdate', function (next) {
  this.set({ lastUpdated: new Date() })
  next()
})

// Prevent model recompilation in development (Next.js hot reload)
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

export default Product
