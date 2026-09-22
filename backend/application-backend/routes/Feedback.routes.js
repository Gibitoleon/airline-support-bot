import express from "express"
import { createFeedback, getallFeedback } from "../controllers/Feedback.controller.js"
import { checkisAdmin } from "../middleware/Verification.guard.js"
const router = express.Router()
router.post("/queries/:queryId/feedback",createFeedback)
router.get("/getallFeedback",checkisAdmin,getallFeedback)

export default router