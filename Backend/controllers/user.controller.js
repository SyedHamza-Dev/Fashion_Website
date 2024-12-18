import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
  
    if (!user) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Function to get favorite listings for a user
export const getFavorites = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('favoriteListings'); // Populate to get full listing details

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json(user.favoriteListings); // Return favorite listings
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to add a listing to favorites
export const addFavorite = async (req, res) => {
  try {
    const userId = req.params.id;
    const listingId = req.body.listingId; // Assume listing ID is sent in the body

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Add the listing ID to user's favoriteListings array if it doesn't already exist
    if (!user.favoriteListings.includes(listingId)) {
      user.favoriteListings.push(listingId);
      await user.save();
    }

    res.status(200).json({ success: true, message: 'Listing added to favorites' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to remove a listing from favorites
export const removeFavorite = async (req, res) => {
  try {
    const userId = req.params.id;
    const listingId = req.body.listingId; // Assume listing ID is sent in the body

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Remove the listing ID from user's favoriteListings array
    user.favoriteListings = user.favoriteListings.filter(id => id.toString() !== listingId);
    await user.save();

    res.status(200).json({ success: true, message: 'Listing removed from favorites' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
