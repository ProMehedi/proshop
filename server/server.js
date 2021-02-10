import dotenv from 'dotenv'
import express from 'express'
import products from './data/products.js'

dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.send('Server is ready!')
})

app.get('/api/products', (req, res) => {
  res.send(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((prodId) => prodId._id === req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: 'Product not found!' })
  }
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
