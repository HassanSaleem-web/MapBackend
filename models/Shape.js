const mongoose = require('mongoose');

// Define the schema
const shapeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    shapes: [
      {
        name: {
          type: String,
          required: true, // Shape name is required
        },
        type: {
          type: String,
          required: true, // Polygon or Line
        },
        coordinates: {
          type: Array,
          required: true, // Coordinates required
        },
        createdAt: {
          type: Date,
          default: Date.now, // Auto-create timestamp
        },
        updatedAt: {
          type: Date,
          default: Date.now, // Auto-update timestamp
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically manage timestamps
  }
);

// Create a COMPOUND INDEX for uniqueness based on email and shape name
shapeSchema.index(
  { email: 1, 'shapes.name': 1 }, // Combination of email + shape name must be unique
  { unique: true } // Enforce uniqueness
);

// Export the model
module.exports = mongoose.model('Shape', shapeSchema);
