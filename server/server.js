import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'

dotenv.config()
connectDB()
const app = express()

app.get('/', (req, res) => {
  res.send('Server is ready!')
})

app.use('/api/products', productRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`.yellow.bold)
})
