import express from "express";
import { sendMessageRoute, getMessages, updateLang } from '../controllers/message.controller.js'
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.post('/send-message/:id', protectedRoute, sendMessageRoute)
router.patch('/updateLanguage', protectedRoute, updateLang)
router.get('/getMessages/:id', protectedRoute, getMessages)


export default router