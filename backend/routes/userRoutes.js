import { authUser, getUserProfile, registerUser, updateUserProfile, getAllUsers } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import express from 'express'
const router = express.Router();

router.route('/').get(protect, admin, getAllUsers)
router.route('/').post(registerUser)
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile) // to implement middleware for authorization, put it first, it will run before the get

export default router;