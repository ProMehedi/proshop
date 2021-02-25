import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
} from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProductById)

export default router
