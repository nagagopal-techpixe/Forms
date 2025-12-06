import express from "express";
import { createSchedule, getSchedules } from "../controllers/scheduleController.js";

const router = express.Router();

router.post("/", createSchedule);
router.get("/", getSchedules); // optional

export default router;
