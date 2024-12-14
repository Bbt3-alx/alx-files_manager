import express from "express";
import { getStats, getStatus } from "../controllers/appController.js";
import { postNew } from "../controllers/UsersController.js";

const router = express.Router();

router.get("/status", getStatus);
router.get("/stats", getStats);
router.post("/users", postNew);

export default router;
