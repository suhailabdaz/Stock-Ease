import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT : process.env.PORT,
    CORS_URL_1: process.env.CORS_URL_1,
    MONGO_URL: process.env.MONGO_URL,
    CORS_URL_2: process.env.CORS_URL_2,
    NODE_ENV: process.env.NODE_ENV
}