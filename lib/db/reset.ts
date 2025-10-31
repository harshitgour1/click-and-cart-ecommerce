import { connectDB, disconnectDB } from './mongodb'
import Product from './models/Product'
import * as readline from 'readline'

/**
 * Create readline interface for user input
 */
function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
}

/**
 * Prompt user for confirmation
 */
function askConfirmation(question: string): Promise<boolean> {
  const rl = createReadlineInterface()
  
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      const normalized = answer.toLowerCase().trim()
      resolve(normalized === 'yes' || normalized === 'y')
    })
  })
}

/**
 * Reset the database by deleting all products
 */
async function resetDatabase(skipConfirmation: boolean = false) {
  try {
    console.log('🗑️  Database Reset Utility')
    console.log('=' .repeat(50))

    // Connect to database
    await connectDB()

    // Get current product count
    const productCount = await Product.countDocuments()
    
    if (productCount === 0) {
      console.log('ℹ️  Database is already empty (0 products)')
      return
    }

    console.log(`\n⚠️  WARNING: This will delete ALL ${productCount} products from the database!`)
    console.log('   This action cannot be undone.\n')

    // Ask for confirmation unless skipped
    if (!skipConfirmation) {
      const confirmed = await askConfirmation('Are you sure you want to continue? (yes/no): ')
      
      if (!confirmed) {
        console.log('\n❌ Reset cancelled by user')
        return
      }
    }

    // Delete all products
    console.log('\n🗑️  Deleting all products...')
    const result = await Product.deleteMany({})

    console.log(`✅ Successfully deleted ${result.deletedCount} products`)
    console.log('   Database is now empty and ready for fresh data')

  } catch (error) {
    console.error('❌ Error resetting database:', error)
    throw error
  } finally {
    await disconnectDB()
  }
}

// Run reset if called directly
if (require.main === module) {
  // Check for --force flag to skip confirmation
  const skipConfirmation = process.argv.includes('--force')
  
  if (skipConfirmation) {
    console.log('⚡ Running in force mode (skipping confirmation)\n')
  }

  resetDatabase(skipConfirmation)
    .then(() => {
      console.log('\n✨ Reset completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n💥 Reset failed:', error)
      process.exit(1)
    })
}

export { resetDatabase }
