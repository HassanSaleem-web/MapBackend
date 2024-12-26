const mongoose = require('mongoose');

// Define the schema
const shapeSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
  },
  shapes: [
    {
      name: { 
        type: String, 
        required: true, 
      },
      type: { 
        type: String, 
        required: true // Polygon/Line
      },
      coordinates: { 
        type: Array, 
        required: true 
      },
      createdAt: { 
        type: Date, 
        default: Date.now 
      },
      updatedAt: { 
        type: Date, 
        default: Date.now 
      }
    },
  ],
}, {
  timestamps: true // Auto-create 'createdAt' and 'updatedAt'
});

module.exports = mongoose.model('Shape', shapeSchema);
