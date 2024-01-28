const express = require('express');
const router = express.Router();
const db = require('../../models');

// Get all comments for a user
router.get('/comments', async (req, res) => {
  try {
    const userId = req.session.user.id; // Assuming user is authenticated
    const comments = await db.Comment.findAll({
      where: { UserId: userId }
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new comment for a user
router.post('/comments', async (req, res) => {
  const { content } = req.body;
  try {
    const userId = req.session.user.id; // Assuming user is authenticated
    const newComment = await db.Comment.create({
      content,
      UserId: userId
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific comment for a user
router.get('/comments/:id', async (req, res) => {
  try {
    const userId = req.session.user.id; // Assuming user is authenticated
    const comment = await db.Comment.findOne({
      where: { id: req.params.id, UserId: userId }
    });
    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
    } else {
      res.json(comment);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific comment for a user
router.put('/comments/:id', async (req, res) => {
  const { content } = req.body;
  try {
    const userId = req.session.user.id; // Assuming user is authenticated
    const updatedComment = await db.Comment.update(
      { content },
      { where: { id: req.params.id, UserId: userId } }
    );
    if (updatedComment[0] === 0) {
      res.status(404).json({ error: 'Comment not found' });
    } else {
      res.json({ message: 'Comment updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a specific comment for a user
router.delete('/comments/:id', async (req, res) => {
  try {
    const userId = req.session.user.id; // Assuming user is authenticated
    const deletedComment = await db.Comment.destroy({
      where: { id: req.params.id, UserId: userId }
    });
    if (deletedComment === 0) {
      res.status(404).json({ error: 'Comment not found' });
    } else {
      res.json({ message: 'Comment deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;