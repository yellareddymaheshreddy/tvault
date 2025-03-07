import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL
});

redis.on('error', (err) => console.log('Redis Client Error', err));

// Connect to redis
if (!redis.isOpen) {
  redis.connect();
}

export default redis; 