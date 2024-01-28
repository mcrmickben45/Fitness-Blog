const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Post, User, Comment } = require('./../models');


router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
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

        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Single post route
router.get('/posts/:id', async (req, res) => {
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

        const post = dbPostData.get({ plain: true });

        res.render('single-post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;