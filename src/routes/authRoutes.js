const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Step 1: Start Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Step 2: Handle callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Create JWT
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token + user data
    res.json({
      token,
      user: {
        name: req.user.name,
        email: req.user.email,
        avatarUrl: req.user.avatarUrl, // ✅ real Gmail profile picture
      },
    });
  }
);

module.exports = router;
