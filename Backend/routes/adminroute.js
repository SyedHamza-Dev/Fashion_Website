import express from 'express';
import { getAllUsers, deleteUserById, updateUserById } from '../controllers/adminController.js';
import { isAdmin } from '../middleware/admin.js';
import { authenticateUser } from '../middleware/auth.js'; // Import the auth middleware

const router = express.Router();

// Apply the authenticateUser middleware first, then the isAdmin middleware
router.get('/users', authenticateUser, isAdmin, getAllUsers); // Authentication followed by admin check
router.route("/users/delete/:id").delete(authenticateUser, isAdmin, deleteUserById); // Delete user by ID
router.route("/users/update/:id").put(authenticateUser, isAdmin, updateUserById); // Update user by ID

export default router;
