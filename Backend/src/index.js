import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/auth.routes.js'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import coreLogicRoute from './routes/coreLogic.route.js'
import messageRoute from './routes/message.route.js'
dotenv.config()
const port = process.env.PORT
const app = express()

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/update-profile', coreLogicRoute)

app.use('/api/message', messageRoute)



app.listen(port, () => {
    console.log(`Backend listening on port - ${port}`)
    connectDB()
})