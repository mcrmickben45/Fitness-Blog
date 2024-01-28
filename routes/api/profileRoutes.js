// routes/api/profileRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../../models');

// Get the user's profile
router.get('/profile', async (req, res) => {
    try {
      const userId = req.session.user.id; // Assuming user is authenticated
      const userProfile = await db.Profile.findOne({
        where: { UserId: userId }
      });
      res.json(userProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Update the user's profile
  router.put('/profile', async (req, res) => {
    const { bio, socialLinks } = req.body;
    try {
      const userId = req.session.user.id; // Assuming user is authenticated
      const [updatedRows] = await db.Profile.update(
        { bio, socialLinks },
        { where: { UserId: userId } }
      );
      if (updatedRows === 0) {
        res.status(404).json({ error: 'Profile not found' });
      } else {
        res.json({ message: 'Profile updated successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;