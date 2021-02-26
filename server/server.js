import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is ready!')
})

// Define Variable
const api = process.env.API_URL || '/api'
const port = process.env.PORT || 5000

app.use(`${api}/products`, productRoutes)
app.use(`${api}/users`, userRoutes)
app.use(`${api}/orders`, orderRoutes)

app.get(`${api}/config/paypal`, (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`.yellow.bold)
})
