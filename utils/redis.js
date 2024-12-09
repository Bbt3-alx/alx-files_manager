import redis from "redis";
import { promisify } from "util";

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on("error", (err) => {
      console.log(err);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    // Use promisify to convert callback `get` to Promise
    const getAsync = promisify(this.client.get).bind(this.client);
    try {
      return await getAsync(key);
    } catch (error) {
      console.log("Error fetcing key from Redis:", error);
      return null;
    }
  }
  async set(key, value, duration) {
    // Use promisify to convert callback `set` to Promise
    const setAsync = promisify(this.client.setex).bind(this.client);
    try {
      return await setAsync(key, value, duration);
    } catch (error) {
      console.log("Error setting key in Redis:", error);
    }
  }
  async del(key) {
    // Use promisify to to convert callback-based `del` to Promise
    const delAsync = promisify(this.client.del).bind(this.client);
    try {
      await delAsync(key);
    } catch (error) {
      console.log("Error deleting key from Redis:", error);
    }
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
