const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// Home Route
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: [{ model: Comment }] });
    res.render('home', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/post.:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId, { include: [{ model: Comment }] });
        res.render('post', { post });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports = router;