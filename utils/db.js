import mongodb from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || "file_manager";

class DBClient {
  constructor() {
    this.client = new mongodb.MongoClient(
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
    return this.db.collection("users").countDocuments();
  }

  async nbFiles() {
    return this.db.collection("files").countDocuments();
  }
}

// Instantiate and connect
const dbClient = new DBClient();
export default dbClient;
