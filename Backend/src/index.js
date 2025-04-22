import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.routes.js'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import coreLogicRoute from './routes/coreLogic.route.js'
import messageRoute from './routes/message.route.js'
import contactRoute from './routes/contact.routes.js'
import { app, server } from './lib/socket.js'
dotenv.config()
const port = process.env.PORT


app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/auth', authRoute)
app.use('/api/update-profile', coreLogicRoute)
app.use('/api/message', messageRoute)
app.use('/api/contacts', contactRoute)



server.listen(port, () => {
    console.log(`Backend listening on port - ${port}`)
    connectDB()
})