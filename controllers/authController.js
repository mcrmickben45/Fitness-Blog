const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Registration Route
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    req.session.userId = newUser.id; // Set user session
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user && /* validate password */) {
      req.session.userId = user.id; // Set user session
      res.redirect('/dashboard');
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

router.get('/profile', async (req, res) => {
    try {
      const user = await User.findByPk(req.session.userId);
      res.render('profile', { user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;