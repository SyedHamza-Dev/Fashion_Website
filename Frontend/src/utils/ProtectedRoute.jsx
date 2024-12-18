// src/utils/auth.js

// Check if user is admin
export const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Assuming you have user data stored
  return user && user.isAdmin; // Check isAdmin property
};
