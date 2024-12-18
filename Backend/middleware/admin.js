// middleware/admin.js

export const isAdmin = (req, res, next) => {
    const user = req.user; // Yeh assume kar rahe hain ke user authenticate ho chuka hai
  
    if (user && user.isAdmin) {
      next(); // Agar admin hai toh aage jao
    } else {
      res.status(403).json({ message: 'You are not an admin.' }); // Agar nahi hai toh error bhejo
    }
  };
  