import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log('Token Found')
  }

  try {
    token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decode.id).select('-password')

    next()
  } catch (error) {
    console.error(error)
    res.status(401)
    throw new Error('Failed to Authorized!')
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Authorized!')
  }
})

export { protect }
