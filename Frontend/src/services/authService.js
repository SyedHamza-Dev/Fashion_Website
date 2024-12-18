// routes/admin.routes.js

import express from 'express';
import { getAllUsers } from '../controllers/admin.controller.js';
import { isAdmin } from '../middleware/admin.js';
import { authenticateUser } from '../middleware/auth.js'; // Import the auth middleware

const router = express.Router();

// Apply the authenticateUser middleware first, then the isAdmin middleware
router.get('/users', authenticateUser, isAdmin, getAllUsers); // Authentication ke baad admin check

export default router;
