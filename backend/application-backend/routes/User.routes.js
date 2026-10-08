import {getStaffUsers} from "../controllers/User.controller.js";
import express from "express";
import { checkisAdmin } from "../middleware/Verification.guard.js"


const router = express.Router();

router.get("/getstaff", checkisAdmin, getStaffUsers);

export default router;