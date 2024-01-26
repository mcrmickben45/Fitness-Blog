const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// Dashboard Route
router.get('/', async (req, res) => {
    try {
        const userPosts = await Post.findAll({
          where: { userId: req.session.userId }, // Adjust based on your user session structure
          include: [{ model: Comment }],
        });
        res.render('dashboard', { userPosts });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.get('/post/:id/edit', async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findByPk(postId);
      res.render('editPost', { post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.put('/post/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      await Post.update(req.body, { where: { id: postId } });
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.delete('/post/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      await Post.destroy({ where: { id: postId } });
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;