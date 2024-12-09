import { MongoClient } from "mongodb";
//import dotenv from "dotenv";

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || "file_manager";

class DBClient {
  constructor() {
    const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.db = null;

    this.client.connect((err) => {
      if (err) {
        consolze.error("Error conecting to MongoDB", err);
        return;
      }
      console.log("Connected to MongoDB");
      this.db = this.client.db(DB_DATABASE);
    });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async mbUsers() {
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
      console.log(error);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
