# Click & Cart - E-Commerce Application

> **Developer**: Harshit Goud  
> **Date**: November 1, 2025

A modern, full-featured e-commerce web application built with Next.js 14+ that demonstrates multiple rendering strategies (SSG, ISR, SSR, CSR) and includes shopping cart functionality, product management, and beautiful UI with Indian-inspired design.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- npm or yarn package manager

### Local Development Setup

1. **Clone the repository**:
```bash
git clone https://github.com/harshitgour1/e-commerce-app.git
cd e-commerce-app
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:
- `MONGODB_URI`: Your MongoDB connection string
- `ADMIN_API_KEY`: Secret key for admin operations (your-secret-api-key-here-is-this-a-strong-key)
- `NEXT_PUBLIC_APP_URL`: Your application URL

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
e-commerce-app/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Home page (SSG)
│   ├── products/            # Product pages
│   ├── dashboard/           # Inventory dashboard (SSR)
│   ├── admin/               # Admin panel (CSR)
│   ├── recommendations/     # Recommendations (RSC)
│   └── api/                 # API routes
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components
│   ├── products/            # Product-related components
│   ├── dashboard/           # Dashboard components
│   └── recommendations/     # Recommendation components
├── lib/                     # Utility functions and configurations
│   ├── db/                  # Database connection and models
│   ├── utils/               # Helper functions
│   └── constants.ts         # Application constants
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

4. **Seed the database with sample products**:
```bash
npm run db:seed
```

5. **Run the development server**:
```bash
npm run dev
```

6. **Open your browser** and visit [http://localhost:3000](http://localhost:3000)

## 📦 Complete Setup & Deployment

**For detailed deployment instructions to Vercel, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

## 🎯 Features

### Core E-Commerce Features
- 🛒 **Shopping Cart**: Full cart functionality with quantity management
- 💳 **Checkout**: Coupon codes and price calculations
- 🖼️ **Product Images**: Optimized images for all 32 products
- 🔍 **Search & Filter**: Real-time product search and category filtering
- 📱 **Responsive Design**: Mobile-first, works on all devices

### Technical Features
- 🏠 **Home Page (SSG)**: Static product listing with client-side interactivity
- 📦 **Product Details (ISR)**: Incremental static regeneration with 60s revalidation
- 📊 **Inventory Dashboard (SSR)**: Real-time inventory monitoring
- ⚙️ **Admin Panel (CSR)**: Client-side product management
- 🎯 **Recommendations (RSC)**: React Server Components with wishlist
- 🎨 **Indian Theme**: Beautiful Indian-inspired color scheme (Saffron, Royal Blue, Emerald)
- ⚡ **Loading States**: Skeleton loaders and spinners for better UX

## 🛠️ Technology Stack

- **Framework**: Next.js 14.2.33 (App Router)
- **Language**: TypeScript 5.0 (strict mode)
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS 3.4
- **Testing**: Vitest with React Testing Library
- **Image Optimization**: Next.js Image component
- **Deployment**: Vercel-ready

## 📜 Available Scripts

- `npm install` - Install all dependencies
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run db:seed` - Seed database with 32 sample products
- `npm run db:reset` - Reset database (clear all products)

## Rendering Strategies

### Static Site Generation (SSG) - Home Page
- Pre-rendered at build time
- Fast initial load
- Client-side filtering and search

### Incremental Static Regeneration (ISR) - Product Pages
- Pre-rendered at build time
- Revalidates every 60 seconds
- On-demand revalidation after updates

### Server-Side Rendering (SSR) - Dashboard
- Rendered on each request
- Always shows fresh data
- Real-time inventory monitoring

### Client-Side Rendering (CSR) - Admin Panel
- Rendered in the browser
- Interactive forms and state management
- API-driven data fetching

### React Server Components (RSC) - Recommendations
- Hybrid server/client rendering
- Reduced client bundle size
- Interactive client components where needed

## 🎨 Application Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Browse all 32 products with search and filter |
| Product Detail | `/products/[slug]` | Detailed product view with add to cart |
| Shopping Cart | `/cart` | Cart management with coupon codes |
| Dashboard | `/dashboard` | Inventory monitoring (SSR) |
| Admin | `/admin` | Product management panel (CSR) |
| Recommendations | `/recommendations` | Personalized product suggestions |
| Login | `/login` | Authentication page |

## 🗂️ Product Catalog

The application includes **32 pre-seeded products** across 8 categories:
- Electronics (4 products) - Headphones, Smartwatch, Charger, Webcam
- Clothing (4 products) - T-Shirt, Denim Jacket, Running Shoes, Scarf
- Home & Garden (4 products) - Plant Pots, Desk Lamp, Cutting Board, Pillows
- Sports & Outdoors (4 products) - Yoga Mat, Camping Tent, Water Bottle, Resistance Bands
- Books (4 products) - Programming, Mindfulness, Cookbook, Sci-Fi
- Toys & Games (4 products) - Building Blocks, Board Game, Puzzle, RC Car
- Health & Beauty (4 products) - Moisturizer, Essential Oils, Toothbrushes, Vitamin C Serum
- Food & Beverages (4 products) - Green Tea, Chocolate, Honey, Protein Powder

All products include high-quality images from Unsplash. See [PRODUCT_IMAGES.md](./PRODUCT_IMAGES.md) for details.

## 🚀 Deployment to Vercel

This project is optimized for Vercel deployment. Simply:

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `ADMIN_API_KEY`
   - `NEXT_PUBLIC_APP_URL`
   - `NODE_ENV=production`
4. Deploy!

**For detailed step-by-step deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# UI mode
npm run test:ui
```

Tests include:
- Component unit tests
- API route tests
- Utility function tests
- Database operation tests

## 🎯 Key Features

### Shopping Cart
- Add/remove products with quantity management
- Real-time price calculations (subtotal, shipping, total)
- Coupon code support: `SAVE10` (10% off), `SAVE20` (20% off), `WELCOME` (15% off)
- Stock validation and out-of-stock handling
- Persistent cart state

### Product Management
- CRUD operations via Admin panel
- Real-time inventory tracking
- Category-based organization
- Search and filtering capabilities
- Low stock warnings (< 10 units)

### Performance Optimizations
- ✅ Next.js Image optimization for all product images
- ✅ Static Site Generation (SSG) for fast initial load
- ✅ Incremental Static Regeneration (ISR) for product pages
- ✅ Code splitting and lazy loading
- ✅ Efficient MongoDB queries with indexing
- ✅ Tailwind CSS with PurgeCSS

## API Endpoints

### GET /api/products
Retrieve all products with optional filtering

### GET /api/products/[slug]
Retrieve a single product by slug

### POST /api/products
Create a new product (requires authentication)

### PUT /api/products/[id]
Update an existing product (requires authentication)

### POST /api/auth/login
User authentication

### GET /api/auth/session
Get current user session

## 🤝 Contributing

This is a portfolio/assignment project. Feel free to fork and customize!

## 📄 License

MIT - Free to use for educational purposes

## 👨‍💻 Developer Information

**Developer**: Harshit Goud  
**Date**: November 1, 2025  
**Repository**: [github.com/harshitgour1/e-commerce-app](https://github.com/harshitgour1/e-commerce-app)

---

**Built with ❤️ using Next.js 14, TypeScript, MongoDB, and Tailwind CSS**
