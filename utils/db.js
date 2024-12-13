import pkg from "mongodb";
const { MongoClient } = pkg;
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || "file_manager";

class DBClient {
  constructor() {
    this.client = new MongoClient(
      `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
      { useUnifiedTopology: true }
    );
    this.client.connect();
    this.db = this.client.db(DB_DATABASE);
  }

  isAlive() {
    try {
      return this.client.topology.isConnected();
    } catch (error) {
      return false;
    }
  }

  async nbUsers() {
    if (!this.db) return 0;
    try {
      const count = await this.db.collection("users").countDocuments();
      return count;
    } catch (error) {
      console.log("Error fetching user count:", error);
      return 0;
    }
  }

  async nbFiles() {
    if (!this.db) return 0;
    try {
      const count = await this.db.collection("files").countDocuments();
      return count;
    } catch (error) {
      console.log("Error fetching file count:", error);
      return 0;
    }
  }
}

// Instantiate and connect
const dbClient = new DBClient();
export default dbClient;
