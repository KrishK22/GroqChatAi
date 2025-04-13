import messageModel from '../models/message.model.js'
import { Types } from 'mongoose'

export const sendMessageRoute = async (req, res) => {
    try {
        const senderId = req.user?._id;
        const receiverId = req.params.id;
        const { originalText } = req.body;

        if (!originalText) {
            res.status(400).json({
                message: "Message text is required"
            });
            return;
        }

        if (!Types.ObjectId.isValid(receiverId)) {
            res.status(400).json({
                message: "Invalid receiver ID"
            });
            return;
        }

        const msg = await messageModel.create({
            senderId,
            receiverId: new Types.ObjectId(receiverId),
            originalText
        });

        res.status(200).json({
            message: "Message sent successfully",
            msg
        });

    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error in sendMessage Route ${error.message}`)
            res.status(500).json({
                message: "Internal Server Error!"
            });
        } else {
            res.status(500).json({
                message: "Something went wrong!"
            });
        }
    }
}