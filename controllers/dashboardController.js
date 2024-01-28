const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Post, User, Comment } = require('./../models');
const withAuth = require('../utils/auth.js');

// Get route for main page
// withAuth() calls next() anonymous fx OR res.redirect('/login');

router.get('/', withAuth, async (req, res) => {
    try {
        console.log(req.session);
        console.log('================================');
        const dbPostData = await this.post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // serialize data before passing to template
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        // protect route from non-logged-in users 
        res.render('dashboard', { posts, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        } 
        // serialize data
        const post = dbPostData.get({ plain: true });

        // pass data to the template with the session variable
        res.render('edit-post', { post, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;