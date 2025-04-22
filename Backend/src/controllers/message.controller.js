import messageModel from '../models/message.model.js'
import userModel from '../models/user.model.js'
import { Types } from 'mongoose'
import { Translation } from '../lib/groq.js';
import { io, getReceiverSocketId, emitMessageToUser } from '../lib/socket.js';

export const sendMessageRoute = async (req, res) => {
    try {
        const senderId = req.user?._id;
        const receiverId = req.params.id;
        const langSelected = req.user.selectedLanguage
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

        let msg;
        if (langSelected === 'en') {
            msg = await messageModel.create({
                senderId,
                receiverId: new Types.ObjectId(receiverId),
                originalText
            });
        } else {
            const trans = await Translation(originalText, "en")
            msg = await messageModel.create({
                senderId,
                receiverId: new Types.ObjectId(receiverId),
                originalText: trans['en']
            });
        }

        // Emit socket event to receiver
        emitMessageToUser(receiverId, "newMessage", msg);
        
        // Also emit to sender to ensure consistency
        emitMessageToUser(senderId, "messageSent", msg);

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

export const updateLang = async (req, res) => {
    try {
        const userId = req.user._id;
        const lang = req.body.lang
        const updatedLanguage = await userModel.findByIdAndUpdate(userId, {
            selectedLanguage: lang
        },
            {
                new: true,
                runValidators: true
            }
        )
        res.status(200).json({
            updatedLanguage
        })


    } catch (error) {
        console.log(`error in update lang ${error.message}`)
        res.status(400).json({
            message: "Internal Server Erro "
        })
    }
}


export const getMessages = async (req, res) => {
    try {
        const userId = req.user._id;
        const receiverId = req.params.id;
        const langSelected = req.user.selectedLanguage;

        const orgMessage = await messageModel.find({
            $or: [
                { senderId: receiverId, receiverId: userId },
                { senderId: userId, receiverId: receiverId }
            ]
        }).sort({ createdAt: 1 });

        if (langSelected === "en") {
            return res.status(200).json(orgMessage);
        }

        const translatedMessages = await Promise.all(
            orgMessage.map(async (message) => {
                if (!message.translatedText || !message.translatedText[langSelected]) {
                    const translation = await Translation(message.originalText, langSelected);
                    const updatedMessage = await messageModel.findByIdAndUpdate(
                        message._id,
                        { translatedText: translation },
                        { new: true }
                    );
                    return updatedMessage;
                }
                return message;
            })
        );

        res.status(200).json(translatedMessages);
    } catch (error) {
        console.error("Error in getMessages:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}