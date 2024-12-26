const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true }, // Google UID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String }, // Profile Picture URL
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
