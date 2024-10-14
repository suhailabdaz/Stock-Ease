import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT : process.env.PORT,
    DEV_CORS_URI: process.env.DEV_CORS_URI,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV
}