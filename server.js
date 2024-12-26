const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json'); // Adjust path if needed
const shapeRoutes = require('./routes/shapeRoutes'); // New Route for Shapes

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Configurations
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON body

// Routes
app.use('/api/users', userRoutes);
app.use('/api/shapes', shapeRoutes); // Shape Routes


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
