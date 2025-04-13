import express from "express";
import { sendMessageRoute } from '../controllers/message.controller.js'
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.post('/send-message/:id', protectedRoute, sendMessageRoute)


export default router