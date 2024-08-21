import Redis from 'ioredis';
import  serverConfig  from './server.config'
const redisConfig = {
    port: serverConfig.REDIS_PORT,
    host: 'localhost',
    maxRetriesPerRequest: null
};

const redisConnection = new Redis(redisConfig);

export default redisConnection