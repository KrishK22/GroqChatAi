import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MongoDb connected : ${connection.connection.host}`)
    } catch (error) {
        if (error instanceof Error) {
            console.log('MongoDB connectionk error ', error.message)
        }
        else {
            console.log('unknow error occoured during mongo db connection ')
        }

    }
}