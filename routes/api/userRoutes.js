// routes/api/userRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../../models');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific user
router.get('/users/:id', async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id, {
      include: [db.BlogPost, db.Comment, db.Profile]
    });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all blog posts for a specific user
router.get('/users/:userId/blogPosts', async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.userId, {
        include: [db.BlogPost]
      });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(user.BlogPosts);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Update a specific user
router.put('/users/:id', async (req, res) => {
  const { username, email, firstName, lastName, bio } = req.body;
  try {
    const updatedUser = await db.User.update(
      { username, email, firstName, lastName, bio },
      { where: { id: req.params.id } }
    );
    if (updatedUser[0] === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a specific user
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await db.User.destroy({
      where: { id: req.params.id }
    });
    if (deletedUser === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more user routes as needed

module.exports = router;