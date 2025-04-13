import mongoose from "mongoose";



const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        originalText: {
            type: String,
        },
        translatedText: {
            type: Map,
            of: String,
        },
    },
    { timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)

export default Message;
