const express = require('express');
const { saveUser } = require('../controllers/userController');
const router = express.Router();

// Save User Data Route
router.post('/saveUser', saveUser);

module.exports = router;
