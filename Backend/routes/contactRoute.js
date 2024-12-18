import express from 'express';
import { sendContactEmailController } from '../controllers/contactController.js';

const router = express.Router();

// Define the route for sending contact emails
router.post('/contact', (req, res, next) => {
    console.log('Received contact request:', req.body); // Log the request body
    sendContactEmailController(req, res).catch(next);
});

export default router;
