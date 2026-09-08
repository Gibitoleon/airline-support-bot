import express from 'express';
import { login, logout } from '../controllers/Auth.controller.js';

// route for authentication routes
const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);

export default router;