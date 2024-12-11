import express from "express";
import { getStats, getStatus } from "../controllers/app.Controller.js";

const router = express.Router();

router.get("/status", getStatus);
router.get("/stats", getStats);

export default router;