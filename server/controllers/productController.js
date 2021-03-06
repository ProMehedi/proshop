import asyncHandler from 'express-async-handler'
import Product from '../models/ProductModel.js'

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
})

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not Found!')
  }
})

// @desc    Create New Product
// @route   POST /api/v1/products/
// @access  Private
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: req.body.name || 'Product name',
    description: req.body.description || 'Product description',
    image: req.body.image || 'https://picsum.photos/600/500',
    brand: req.body.brand || 'sample-brand',
    price: req.body.price,
    category: req.body.category || 'sample-category',
    countInStock: req.body.countInStock,
    rating: req.body.rating || 0,
    reviews: req.body.reviews,
    numReviews: req.body.numReviews || 0,
  })

  const createdProduct = await product.save()

  if (createdProduct) {
    res.status(201).json(createdProduct)
  } else {
    res.status(401)
    throw new Error("This Product can't be added!")
  }
})

// @desc    Update A Product
// @route   PUT /api/v1/products/:id
// @access  Private
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  const {
    name,
    description,
    image,
    brand,
    price,
    category,
    countInStock,
    rating,
    reviews,
    numReviews,
  } = req.body

  if (product) {
    product.name = name
    product.description = description
    product.image = image
    product.brand = brand
    product.price = price
    product.category = category
    product.countInStock = countInStock
    product.rating = rating || 0
    product.reviews = reviews
    product.numReviews = numReviews || 0

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(401)
    throw new Error('Product not found!')
  }
})

// @desc    Delete A Product By Id
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
export const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.status(201).json({ success: true, message: 'Product Removed!' })
  } else {
    res.status(404)
    throw new Error('Product Not Found!')
  }
})

// @desc    Create New Review
// @route   POST /api/v1/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  const { rating, comment } = req.body

  if (product) {
    const alreadyReviewd = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewd) {
      res.status(400)
      throw new Error('Product Already Reviewd!')
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()

    res.status(201).json({ message: 'Review Added' })
  } else {
    res.status(401)
    throw new Error('Product not found!')
  }
})
