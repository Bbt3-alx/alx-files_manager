import express from "express";
import dotenv from "dotenv";
import apiStatAndStatus from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use("/", apiStatAndStatus);

app.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
