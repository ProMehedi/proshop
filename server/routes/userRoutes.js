import express from 'express'
import {
  authUser,
  getUserProfile,
  regiterUser,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(regiterUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router
