import dbClient from "../utils/db.js";
import redis from "../utils/redis.js";

export const getStatus = async (req, res) => {
  const redIsActive = await redis.isAlive();
  const dbClientIsActive = await dbClient.isAlive();
  if (redIsActive && dbClientIsActive) {
    res.status(200).json({ redis: redIsActive, db: dbClientIsActive });
  }
};

export const getStats = async (req, res) => {
  try {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();
    res.status(200).json({ users: nbUsers, file: nbFiles });
  } catch (error) {
    console.log("Error in getStats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
