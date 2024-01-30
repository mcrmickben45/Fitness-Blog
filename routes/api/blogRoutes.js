const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/blogPosts', async (req, res) => {
  try {
    const blogPosts = await db.BlogPost.findAll();
    res.json(blogPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/blogPosts/:id', async (req, res) => {
  try {
    const blogPost = await db.BlogPost.findByPk(req.params.id, {
      include: [db.Comment]
    });
    if (!blogPost) {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.json(blogPost);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/blogPosts', async (req, res) => {
  const { title, content, image } = req.body;
  try {
    const userId = req.session.user.id; 
    const newBlogPost = await db.BlogPost.create({
      title,
      content,
      image,
      UserId: userId
    });
    res.status(201).json(newBlogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/blogPosts/:id', async (req, res) => {
  const { title, content, image } = req.body;
  try {
    const userId = req.session.user.id; 
    const updatedBlogPost = await db.BlogPost.update(
      { title, content, image },
      { where: { id: req.params.id, UserId: userId } }
    );
    if (updatedBlogPost[0] === 0) {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.json({ message: 'Blog post updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/blogPosts/:id', async (req, res) => {
  try {
    const userId = req.session.user.id; 
    const deletedBlogPost = await db.BlogPost.destroy({
      where: { id: req.params.id, UserId: userId }
    });
    if (deletedBlogPost === 0) {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.json({ message: 'Blog post deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
