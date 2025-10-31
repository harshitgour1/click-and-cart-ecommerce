# E-Commerce Next.js Application

A modern e-commerce web application built with Next.js 14+ that demonstrates multiple rendering strategies (SSG, ISR, SSR, CSR) across different pages.

## Features

- 🏠 **Home Page (SSG)**: Static product listing with client-side search and filtering
- 📦 **Product Details (ISR)**: Incremental static regeneration with 60s revalidation
- 📊 **Inventory Dashboard (SSR)**: Real-time inventory monitoring with server-side rendering
- ⚙️ **Admin Panel (CSR)**: Client-side rendered admin interface for product management
- 🎯 **Recommendations (RSC)**: React Server Components with interactive wishlist

## Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS 3
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd e-commerce-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
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

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

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

## API Endpoints

### GET /api/products
Retrieve all products with optional filtering

### GET /api/products/[slug]
Retrieve a single product by slug

### POST /api/products
Create a new product (requires authentication)

### PUT /api/products/[id]
Update an existing product (requires authentication)

## Environment Variables

See `.env.example` for required environment variables.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
