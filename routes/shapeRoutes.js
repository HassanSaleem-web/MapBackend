const express = require('express');
const router = express.Router();
const Shape = require('../models/Shape'); // MongoDB Shape Model
const admin = require('firebase-admin');

// Verify Firebase Token
const verifyToken = async (token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (err) {
    throw new Error('Invalid Token');
  }
};

// Save Shapes
router.post('/saveShapes', async (req, res) => {
  const { email, shapes, token } = req.body; // Email + Shapes Array

  try {
    // Token Validation
    const decodedToken = await verifyToken(token);
    if (decodedToken.email !== email) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }

    // Check if User Exists
    let shapeData = await Shape.findOne({ email });
    if (!shapeData) {
      // If no data exists, create new entry
      shapeData = new Shape({ email, shapes: [] });
    }

    // Validate Shapes within this User's Shapes Only
    for (const newShape of shapes) {
      // Check if name already exists for this user
      const nameExists = shapeData.shapes.some(
        (shape) => shape.name === newShape.name
      );

      if (nameExists) {
        return res.status(400).json({
          message: `Shape name '${newShape.name}' already exists for this user.`,
        });
      }

      // Check if coordinates already exist for this user
      const coordExists = shapeData.shapes.some(
        (shape) => JSON.stringify(shape.coordinates) === JSON.stringify(newShape.coordinates)
      );

      if (coordExists) {
        return res.status(400).json({
          message: 'A shape with identical coordinates already exists for this user!',
        });
      }

      // Push Valid Shape
      shapeData.shapes.push(newShape);
    }

    // Save Data
    await shapeData.save();

    res.status(201).json({ message: 'Shapes saved successfully!' });
  } catch (err) {
    console.error('Error Saving Shapes:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});



// Fetch Shapes
router.post('/getShapes', async (req, res) => {
    try {
      const { email } = req.body; // Retrieve email from request body
        console.log(email)
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
  
      const shapes = await Shape.find({ email });
      res.status(200).json({ shapes });
    } catch (err) {
      console.error('Fetch Shapes Error:', err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  });

module.exports = router;
