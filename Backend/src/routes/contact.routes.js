import express from 'express'
import { contactRoute, addNewContactRoute } from '../controllers/contact.controller.js'
import { protectedRoute } from '../middleware/protectedRoute.js'
const router = express.Router()

router.patch('/add-new-contact', protectedRoute, addNewContactRoute)
router.get('/my-contacts', protectedRoute, contactRoute)


export default router;
