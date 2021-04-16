import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
import express from 'express'
const router = express.Router();

router.route('/').post(registerUser)
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile) // to implement middleware for authorization, put it first, it will run before the get

export default router;