const User = require('../models/User');
const admin = require('firebase-admin');

// Verify Firebase token using admin SDK
const verifyToken = async (token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (err) {
    throw new Error('Invalid Token');
  }
};

// Save or Update User Data After Firebase Login
exports.saveUser = async (req, res) => {
  const { googleId, name, email, profilePic, token } = req.body;

  try {
    // Step 1: Verify Token
    const decodedToken = await verifyToken(token);
    if (decodedToken.uid !== googleId) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = await User.create({ googleId, name, email, profilePic });
      await user.save();
      return res.status(201).json({ message: 'User Registered', user });
    } 
      

    res.status(200).json({ message: 'User Logged In', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
