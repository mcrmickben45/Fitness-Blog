// const express = require('express');
// const router = express.Router();
// const { Post, Comment } = require('../models');

// // Forum Route
// router.get('/', async (req, res) => {
//   try {
//     const forumPosts = await Post.findAll({ include: [{ model: Comment }] });
//     res.render('forum', { forumPosts });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post('/post', async (req, res) => {
//     try {
//         const newPost = await Post.create({
//             title: req.body.title,
//             content: req.body.content,
//             userId: req.session.userId,
//         });
//         res.redirect('/forum');
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.post('/comment/:postId', async (req, res) => {
//     try {
//         const postId = req.params.postId;
//         const newComment = await Comment.create({
//             content: req.body.content,
//             userId: req.session.userId,
//             postId: postId,
//         });
//         res.redirect(`/forum/post/${postId}`);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });



module.exports = router;