import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleWare.js'

dotenv.config()
connectDB()
const app = express()

app.get('/', (req, res) => {
  res.send('Server is ready!')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`.yellow.bold)
})
