# Database Utilities

This directory contains utilities for managing the MongoDB database during development and testing.

## Available Scripts

### Seed Database

Populate the database with sample product data:

```bash
npm run db:seed
```

This will:
- Insert 32 sample products across all 8 categories
- Include products with varying inventory levels (some low stock, some high)
- Display a summary of inserted products by category
- Show which items are low stock (< 10 units)

**Note:** The seed script will not run if products already exist in the database. Run the reset script first if you want to reseed.

### Reset Database

Clear all products from the database:

```bash
npm run db:reset
```

This will:
- Prompt for confirmation before deleting
- Delete all products from the database
- Display the number of deleted products

**Force Reset (Skip Confirmation):**

```bash
npm run db:reset:force
```

Use this in automated scripts or when you're certain you want to delete all data without confirmation.

## Sample Data

The seed script includes 32 products across all categories:

- **Electronics** (4 products): Headphones, Smart Watch, Charger, Webcam
- **Clothing** (4 products): T-Shirt, Denim Jacket, Running Shoes, Scarf
- **Home & Garden** (4 products): Plant Pots, Desk Lamp, Cutting Board, Pillow Covers
- **Sports & Outdoors** (4 products): Yoga Mat, Camping Tent, Water Bottle, Resistance Bands
- **Books** (4 products): Programming, Mindfulness, Cookbook, Sci-Fi Anthology
- **Toys & Games** (4 products): Building Blocks, Board Game, Puzzle, RC Car
- **Health & Beauty** (4 products): Face Moisturizer, Essential Oils, Toothbrushes, Vitamin C Serum
- **Food & Beverages** (4 products): Green Tea, Dark Chocolate, Honey, Protein Powder

### Low Stock Items

The following products have inventory < 10 units (useful for testing dashboard alerts):
- Smart Watch Pro (8 units)
- 4K Webcam (5 units)
- Running Shoes (7 units)
- LED Desk Lamp (3 units)
- Camping Tent 4-Person (6 units)
- Mindfulness for Beginners (9 units)
- Board Game: Strategy Quest (4 units)
- Essential Oils Set (8 units)
- Dark Chocolate Bar (2 units)

## Usage in Development

### Initial Setup

1. Make sure your `.env.local` file has the `MONGODB_URI` configured
2. Run the seed script to populate the database:
   ```bash
   npm run db:seed
   ```

### Reset and Reseed

If you want to start fresh:

```bash
npm run db:reset
npm run db:seed
```

Or use force mode for automation:

```bash
npm run db:reset:force && npm run db:seed
```

## Programmatic Usage

You can also import and use these utilities in your own scripts:

```typescript
import { seedDatabase } from '@/lib/db/seed'
import { resetDatabase } from '@/lib/db/reset'

// Seed the database
await seedDatabase()

// Reset the database (with confirmation)
await resetDatabase()

// Reset the database (skip confirmation)
await resetDatabase(true)
```

## Requirements

These utilities satisfy **Requirement 7.1** from the requirements document:
- Store product data in MongoDB database
- Generate sample products with realistic data
- Include products across all categories
- Vary inventory levels for testing purposes
