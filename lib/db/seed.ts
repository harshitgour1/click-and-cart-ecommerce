import { connectDB, disconnectDB } from './mongodb'
import Product from './models/Product'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

// Sample product data with realistic information
const sampleProducts = [
  // Electronics
  {
    name: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality. Perfect for music lovers and professionals.',
    price: 149.99,
    category: 'Electronics',
    inventory: 45,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
  },
  {
    name: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    description: 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and water resistance. Stay connected and healthy.',
    price: 299.99,
    category: 'Electronics',
    inventory: 8, // Low stock
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
  },
  {
    name: 'USB-C Fast Charger',
    slug: 'usb-c-fast-charger',
    description: 'Compact 65W USB-C charger with multiple ports for charging laptops, phones, and tablets simultaneously.',
    price: 39.99,
    category: 'Electronics',
    inventory: 120,
    image: 'https://images.unsplash.com/photo-1591290619762-634c0e8a5d75?w=600',
  },
  {
    name: '4K Webcam',
    slug: '4k-webcam',
    description: 'Professional 4K webcam with auto-focus and built-in microphone. Ideal for video conferencing and streaming.',
    price: 89.99,
    category: 'Electronics',
    inventory: 5, // Low stock
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600',
  },

  // Clothing
  {
    name: 'Classic Cotton T-Shirt',
    slug: 'classic-cotton-t-shirt',
    description: 'Comfortable 100% organic cotton t-shirt available in multiple colors. Soft, breathable, and perfect for everyday wear.',
    price: 24.99,
    category: 'Clothing',
    inventory: 200,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
  },
  {
    name: 'Denim Jacket',
    slug: 'denim-jacket',
    description: 'Timeless denim jacket with a modern fit. Durable and stylish for any season.',
    price: 79.99,
    category: 'Clothing',
    inventory: 35,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600',
  },
  {
    name: 'Running Shoes',
    slug: 'running-shoes',
    description: 'Lightweight running shoes with cushioned sole and breathable mesh upper. Designed for comfort and performance.',
    price: 89.99,
    category: 'Clothing',
    inventory: 7, // Low stock
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
  },
  {
    name: 'Winter Wool Scarf',
    slug: 'winter-wool-scarf',
    description: 'Cozy wool scarf to keep you warm during cold weather. Available in classic patterns.',
    price: 34.99,
    category: 'Clothing',
    inventory: 60,
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600',
  },

  // Home & Garden
  {
    name: 'Ceramic Plant Pot Set',
    slug: 'ceramic-plant-pot-set',
    description: 'Set of 3 elegant ceramic plant pots with drainage holes. Perfect for indoor plants and succulents.',
    price: 29.99,
    category: 'Home & Garden',
    inventory: 85,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600',
  },
  {
    name: 'LED Desk Lamp',
    slug: 'led-desk-lamp',
    description: 'Adjustable LED desk lamp with touch controls and multiple brightness levels. Energy-efficient and eye-friendly.',
    price: 44.99,
    category: 'Home & Garden',
    inventory: 3, // Low stock
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600',
  },
  {
    name: 'Bamboo Cutting Board',
    slug: 'bamboo-cutting-board',
    description: 'Eco-friendly bamboo cutting board with juice groove. Durable and naturally antimicrobial.',
    price: 19.99,
    category: 'Home & Garden',
    inventory: 150,
    image: 'https://images.unsplash.com/photo-1594843310746-d2de5c1d5e8e?w=600',
  },
  {
    name: 'Throw Pillow Covers',
    slug: 'throw-pillow-covers',
    description: 'Set of 4 decorative throw pillow covers in modern designs. Easy to clean and change your home decor.',
    price: 32.99,
    category: 'Home & Garden',
    inventory: 95,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600',
  },

  // Sports & Outdoors
  {
    name: 'Yoga Mat Premium',
    slug: 'yoga-mat-premium',
    description: 'Extra-thick non-slip yoga mat with carrying strap. Perfect for yoga, pilates, and floor exercises.',
    price: 39.99,
    category: 'Sports & Outdoors',
    inventory: 70,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600',
  },
  {
    name: 'Camping Tent 4-Person',
    slug: 'camping-tent-4-person',
    description: 'Spacious 4-person camping tent with waterproof design and easy setup. Great for family camping trips.',
    price: 159.99,
    category: 'Sports & Outdoors',
    inventory: 6, // Low stock
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600',
  },
  {
    name: 'Stainless Steel Water Bottle',
    slug: 'stainless-steel-water-bottle',
    description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free.',
    price: 27.99,
    category: 'Sports & Outdoors',
    inventory: 180,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
  },
  {
    name: 'Resistance Bands Set',
    slug: 'resistance-bands-set',
    description: 'Set of 5 resistance bands with different strength levels. Includes carrying bag and door anchor.',
    price: 24.99,
    category: 'Sports & Outdoors',
    inventory: 110,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600',
  },

  // Books
  {
    name: 'The Art of Programming',
    slug: 'the-art-of-programming',
    description: 'Comprehensive guide to modern programming practices and design patterns. Essential reading for developers.',
    price: 49.99,
    category: 'Books',
    inventory: 42,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600',
  },
  {
    name: 'Mindfulness for Beginners',
    slug: 'mindfulness-for-beginners',
    description: 'Practical guide to meditation and mindfulness practices. Transform your daily life with simple techniques.',
    price: 16.99,
    category: 'Books',
    inventory: 9, // Low stock
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600',
  },
  {
    name: 'Cookbook: Healthy Meals',
    slug: 'cookbook-healthy-meals',
    description: 'Collection of 200+ healthy and delicious recipes for everyday cooking. Includes nutritional information.',
    price: 29.99,
    category: 'Books',
    inventory: 65,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600',
  },
  {
    name: 'Science Fiction Anthology',
    slug: 'science-fiction-anthology',
    description: 'Curated collection of classic and contemporary science fiction short stories from award-winning authors.',
    price: 22.99,
    category: 'Books',
    inventory: 88,
    image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=600',
  },

  // Toys & Games
  {
    name: 'Building Blocks Set',
    slug: 'building-blocks-set',
    description: '500-piece building blocks set for creative construction. Compatible with major brands. Ages 4+.',
    price: 44.99,
    category: 'Toys & Games',
    inventory: 75,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600',
  },
  {
    name: 'Board Game: Strategy Quest',
    slug: 'board-game-strategy-quest',
    description: 'Award-winning strategy board game for 2-4 players. Perfect for family game nights. Ages 10+.',
    price: 39.99,
    category: 'Toys & Games',
    inventory: 4, // Low stock
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600',
  },
  {
    name: 'Puzzle 1000 Pieces',
    slug: 'puzzle-1000-pieces',
    description: 'Beautiful landscape jigsaw puzzle with 1000 pieces. Relaxing activity for all ages.',
    price: 19.99,
    category: 'Toys & Games',
    inventory: 130,
    image: 'https://images.unsplash.com/photo-1587731556938-38755b4803a6?w=600',
  },
  {
    name: 'Remote Control Car',
    slug: 'remote-control-car',
    description: 'High-speed remote control car with rechargeable battery. Durable design for indoor and outdoor use.',
    price: 54.99,
    category: 'Toys & Games',
    inventory: 55,
    image: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?w=600',
  },

  // Health & Beauty
  {
    name: 'Organic Face Moisturizer',
    slug: 'organic-face-moisturizer',
    description: 'Hydrating face moisturizer with natural ingredients. Suitable for all skin types. Cruelty-free.',
    price: 34.99,
    category: 'Health & Beauty',
    inventory: 92,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600',
  },
  {
    name: 'Essential Oils Set',
    slug: 'essential-oils-set',
    description: 'Set of 6 pure essential oils for aromatherapy and relaxation. Includes lavender, peppermint, and eucalyptus.',
    price: 29.99,
    category: 'Health & Beauty',
    inventory: 8, // Low stock
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600',
  },
  {
    name: 'Bamboo Toothbrush Pack',
    slug: 'bamboo-toothbrush-pack',
    description: 'Eco-friendly bamboo toothbrushes pack of 4. Biodegradable and sustainable alternative to plastic.',
    price: 12.99,
    category: 'Health & Beauty',
    inventory: 200,
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600',
  },
  {
    name: 'Vitamin C Serum',
    slug: 'vitamin-c-serum',
    description: 'Brightening vitamin C serum for radiant skin. Reduces dark spots and improves skin texture.',
    price: 24.99,
    category: 'Health & Beauty',
    inventory: 105,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600',
  },

  // Food & Beverages
  {
    name: 'Organic Green Tea',
    slug: 'organic-green-tea',
    description: 'Premium organic green tea leaves. Rich in antioxidants. 100 tea bags per box.',
    price: 14.99,
    category: 'Food & Beverages',
    inventory: 140,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600',
  },
  {
    name: 'Dark Chocolate Bar',
    slug: 'dark-chocolate-bar',
    description: '85% cacao dark chocolate bar. Rich, smooth taste with health benefits. Fair trade certified.',
    price: 4.99,
    category: 'Food & Beverages',
    inventory: 2, // Low stock
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=600',
  },
  {
    name: 'Organic Honey',
    slug: 'organic-honey',
    description: 'Pure organic honey from local beekeepers. 16 oz jar. Natural sweetener with health benefits.',
    price: 18.99,
    category: 'Food & Beverages',
    inventory: 78,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784378?w=600',
  },
  {
    name: 'Protein Powder Vanilla',
    slug: 'protein-powder-vanilla',
    description: 'Plant-based protein powder with 20g protein per serving. Vanilla flavor. 2 lb container.',
    price: 39.99,
    category: 'Food & Beverages',
    inventory: 62,
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d4eea00?w=600',
  },
]

/**
 * Seed the database with sample product data
 */
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...')

    // Connect to database
    await connectDB()

    // Check if products already exist
    const existingCount = await Product.countDocuments()
    if (existingCount > 0) {
      console.log(`⚠️  Database already contains ${existingCount} products`)
      console.log('   Run the reset script first if you want to reseed')
      return
    }

    // Insert sample products
    console.log(`📦 Inserting ${sampleProducts.length} sample products...`)
    const insertedProducts = await Product.insertMany(sampleProducts)

    console.log(`✅ Successfully seeded ${insertedProducts.length} products`)
    
    // Display summary by category
    console.log('\n📊 Products by category:')
    for (const category of PRODUCT_CATEGORIES) {
      const count = insertedProducts.filter(p => p.category === category).length
      console.log(`   ${category}: ${count} products`)
    }

    // Display low stock items
    const lowStockItems = insertedProducts.filter(p => p.inventory < 10)
    console.log(`\n⚠️  Low stock items (< 10): ${lowStockItems.length}`)
    lowStockItems.forEach(item => {
      console.log(`   - ${item.name}: ${item.inventory} units`)
    })

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await disconnectDB()
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('\n✨ Seed completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n💥 Seed failed:', error)
      process.exit(1)
    })
}

export { seedDatabase, sampleProducts }
