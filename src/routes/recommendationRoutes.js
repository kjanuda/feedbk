const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation');

router.post('/', async (req, res) => {
  try {
    const { fullName, email, avatarUrl, organization, feedback } = req.body;

    const recommendation = new Recommendation({
      fullName,
      email,
      avatarUrl, // store Gmail profile pic
      organization,
      feedback
    });

    await recommendation.save();
    res.status(201).json(recommendation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const recommendations = await Recommendation.find().sort({ createdAt: -1 });
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
