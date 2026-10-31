import express, { Router } from "express";
import healthCheck from "../controllers/Health.controller.js";

const router = express.Router();

router.get("/gethealth", healthCheck);

export default router;
