import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import products from './data/products.js'
import users from './data/users.js'
import Order from './models/OrderModel.js'
import Product from './models/ProductModel.js'
import User from './models/UserModel.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUser = await User.insertMany(users)
    const adminUser = createdUser[0]._id
    const sampleProudct = products.map((product) => {
      return { ...product, user: adminUser }
    })
    await Product.insertMany(sampleProudct)

    console.log('Data Imported!'.green.inverse)
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
