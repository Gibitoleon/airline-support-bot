import express from "express"
import { sendInvitation } from "../controllers/Invitation.controller.js"
import { checkisAdmin } from "../middleware/Verification.guard.js"


const router = express.Router()

router.post("/sendInvitation",checkisAdmin,sendInvitation)

export default router