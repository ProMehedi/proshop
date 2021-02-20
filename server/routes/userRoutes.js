import express from 'express'
import {
  authUser,
  getUserProfile,
  getUsers,
  regiterUser,
  updateUserProfile,
} from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(regiterUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
