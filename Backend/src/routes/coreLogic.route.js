import express from 'express'
import { languageUpdate, profilePicUpdate } from '../controllers/coreLogic.controller.js'
import { protectedRoute } from '../middleware/protectedRoute.js'

const router = express.Router()

router.patch('/language', protectedRoute, languageUpdate)
router.patch('/profile-pic', protectedRoute, profilePicUpdate)







export default router