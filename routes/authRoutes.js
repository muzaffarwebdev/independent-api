// routes/authRoutes.js
const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    deleteUser,
    getMe
} = require('../controllers/authController'); 

const {
    validateSignup,
    validateLogin
} = require('../middleware/authValidation');

const authenticateToken = require('../middleware/auth'); 

// Public routes
router.post('/register', validateSignup, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/users/me', authenticateToken, getMe);

// Protected routes
router.delete('/users/:id', authenticateToken, deleteUser); 
module.exports = router;