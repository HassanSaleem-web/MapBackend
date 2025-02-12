const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const admin = require('firebase-admin');
//const serviceAccount = require('./config/serviceAccountKey.json'); // Adjust path if needed
const shapeRoutes = require('./routes/shapeRoutes'); // New Route for Shapes

// Firebase Setup
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};


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
