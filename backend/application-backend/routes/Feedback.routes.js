import express from "express";
import {
  createFeedback,
  getallFeedback,
} from "../controllers/Feedback.controller.js";
import {
  getCustomerSession,
  getSessionData,
} from "../middleware/Session.middleware.js";
import { checkisAdmin } from "../middleware/Verification.guard.js";

const router = express.Router();
router.post("/queries/:queryId/feedback", getCustomerSession, createFeedback);
router.get("/getallFeedback", getSessionData, checkisAdmin, getallFeedback);

export default router;
