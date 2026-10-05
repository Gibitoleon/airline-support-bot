import express from "express";
import { getDashboardAnalytics } from "../controllers/Dashboard.controller.js";

const router = express.Router();
router.get("/analytics", getDashboardAnalytics);

export default router;