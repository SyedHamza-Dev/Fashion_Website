import express from 'express';
import { deleteUser, test, updateUser, getUserListings, getUser, getFavorites, addFavorite, removeFavorite } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser);
router.get('/favorites/:id', verifyToken, getFavorites); // Fetch favorites
router.post('/favorites/:id', verifyToken, addFavorite); // Add to favorites
router.delete('/favorites/:id', verifyToken, removeFavorite); // Remove from favorites

export default router;
