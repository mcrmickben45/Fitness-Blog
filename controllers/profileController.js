const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Profile Route
router.get('/', async (req, res) => {
  try {
    const userProfile = await User.findByPk(req.session.userId);
    res.render('profile', { userProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/edit', async (req, res) => {
    try {
      await User.update(req.body, { where: { id: req.session.userId } });
      res.redirect('/profile');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
module.exports = router;