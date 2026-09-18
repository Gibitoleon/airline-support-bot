import express from "express";
import { sendchatQuery, getChats } from "../controllers/Chat.controller.js";

const router = express.Router();

router.post("/sendchatQuery", sendchatQuery);
router.get("/getchats", getChats);

export default router;