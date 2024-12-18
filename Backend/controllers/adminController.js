import User from "../models/user.model.js";

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users); // Return users
  } catch (error) {
    next(error);
  }
};

// Delete user by ID
export const deleteUserById = async (req, res, next) => {
  const { id } = req.params; // Get user ID from request parameters
  try {
    const deletedUser = await User.findByIdAndDelete(id); // Delete user by ID
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' }); // If user not found
    }
    res.status(200).json({ message: 'User deleted successfully.' }); // Return success message
  } catch (error) {
    next(error); // Handle error
  }
};

// Update user by ID
export const updateUserById = async (req, res, next) => {
  const { id } = req.params; // Get user ID from request parameters
  const { username, email } = req.body; // Get updated username and email from request body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' }); // If user not found
    }
    
    res.status(200).json(updatedUser); // Return updated user
  } catch (error) {
    next(error); // Handle error
  }
};
