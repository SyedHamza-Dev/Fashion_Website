// middleware/auth.js

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.access_token; // Token ko cookie se lete hain

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token ko verify karte hain
    req.user = await User.findById(decoded.id); // User ko dhoondte hain
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
