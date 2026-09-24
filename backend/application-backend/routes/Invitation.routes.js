import express from "express"
import { sendInvitation, acceptInvitation } from "../controllers/Invitation.controller.js"
import { checkisAdmin } from "../middleware/Verification.guard.js"


const router = express.Router()

router.post("/sendInvitation",checkisAdmin,sendInvitation)
router.post("/acceptInvitation",acceptInvitation)

export default router