import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true
    }
})

// Map to store user ID to socket ID mapping
const userSocketMap = {}
// Map to store socket ID to user ID mapping
const socketUserMap = {}

io.on("connection", (socket) => {
    console.log("A user connected", socket.id)
    const userId = socket.handshake.query.userId

    if (userId) {
        userSocketMap[userId] = socket.id
        socketUserMap[socket.id] = userId
        console.log(`User ${userId} connected with socket ${socket.id}`)
        
        // Join a room with the user's ID for direct messaging
        socket.join(userId)
    }

    // Handle disconnect
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id)
        const userId = socketUserMap[socket.id]
        if (userId) {
            delete userSocketMap[userId]
            delete socketUserMap[socket.id]
            console.log(`User ${userId} disconnected`)
        }
    })
})

// Helper function to get receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

// Helper function to emit message to a specific user
export const emitMessageToUser = (userId, event, data) => {
    const socketId = userSocketMap[userId]
    if (socketId) {
        io.to(socketId).emit(event, data)
        return true
    }
    return false
}

export { io, app, server }