// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware'); // Importe le middleware de protection

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); // La route /me est protégée par le middleware

module.exports = router;