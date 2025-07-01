const express = require('express');
const {
  register,
  login,
  googleLogin,
  getMe,
  logout,
  verifyRecaptcha,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/verify', verifyRecaptcha);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

module.exports = router;