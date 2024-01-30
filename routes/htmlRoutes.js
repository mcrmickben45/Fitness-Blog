const express = require('express');
const router = express.Router();
const path = require('path');

router.set('views', path.join(__dirname, '../views'));
router.set('view engine', 'handlebars');

router.get('/', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user });
    } else {
        res.render('home');
    }
});

router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user });
    } else {
        res.redirect('/');
    }
});

router.get('/workouts', (req, res) => {
    res.render('workouts', { user: req.session.user });
});

router.get('/nutrition', (req, res) => {
    res.render('nutrition', { user: req.session.user });
});

router.get('/profile', (req, res) => {
    res.render('profile', { user: req.session.user });
});

router.get('/blogPosts', (req, res) => {
    res.render('blogPosts', { user: req.session.user });
});

router.get('/comments', (req, res) => {
    res.render('comments', { user: req.session.user });
});

module.exports = router;
