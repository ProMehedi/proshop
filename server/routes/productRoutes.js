import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
} from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProductById)

export default router
