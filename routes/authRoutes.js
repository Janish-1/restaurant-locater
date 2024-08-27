// routes/authRoutes.js
const express = require('express');
const { register, login, renewToken } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/renew-token', protect, renewToken);

module.exports = router;
