import express from 'express'
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../Controller/userController.js'
import { protect } from '../MiddleWare/authMiddleWare.js'

const router = express.Router()

router.post('/auth', authUser)
router.post('/', registerUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)


export default router