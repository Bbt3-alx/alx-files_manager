import express, { urlencoded } from "express";
import dotenv from "dotenv";
import apiStatAndStatus from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests
app.use("/", apiStatAndStatus);

app.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
