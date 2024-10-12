import mongo from 'mongoose'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { config } from './config'

dotenv.config()

const connectDB=async():Promise<void>=>{
    try {
        const MONGO_URL= config.MONGO_URL
        if(!MONGO_URL)
            {
                throw new Error("MONGO_URL is not defined in environment variables.")
            }
            await mongoose.connect(`${MONGO_URL}aadhar-ocr`) 
            console.log("database Connected");
    } catch (error) { 
        console.error('Error connecting to MongoDB:', error) 
    }
}

export default connectDB