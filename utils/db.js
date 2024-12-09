import MongoClient from "mongodb";
//import dotenv from "dotenv";

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || "file_manager";

class DBClient {
  constructor() {
    const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });

    this.client
      .connect()
      .then(() => {
        this.db = this.client.db(DB_DATABASE);
      })
      .catch((error) => {
        this.db = null;
      });
  }

  isAlive() {
    return (
      this.client && this.client.topology && this.client.topology.isConnected()
    );
  }

  async mbUsers() {
    if (!this.db) return 0;
    try {
      const count = await this.db.collection("users").countDocuments();
      return count;
    } catch (error) {
      console.log(error);
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
