import dotenv from 'dotenv';
dotenv.config();
export default{
    PORT: process.env.PORT || 8080,
    REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379')
}