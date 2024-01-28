// routes/htmlRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Set the views directory
router.set('views', path.join(__dirname, '../views'));
router.set('view engine', 'handlebars');

// Home route
router.get('/', (req, res) => {
  // Check if the user is authenticated
  if (req.session.user) {
    // Render dashboard if authenticated
    res.render('dashboard', { user: req.session.user });
  } else {
    // Render home page if not authenticated
    res.render('home');
  }
});

// Dashboard route
router.get('/dashboard', (req, res) => {
  // Check if the user is authenticated
  if (req.session.user) {
    // Render dashboard if authenticated
    res.render('dashboard', { user: req.session.user });
  } else {
    // Redirect to home page if not authenticated
    res.redirect('/');
  }
});

// Workouts route
router.get('/workouts', (req, res) => {
  // Render workouts page
  res.render('workouts', { user: req.session.user });
});

// Nutrition route
router.get('/nutrition', (req, res) => {
  // Render nutrition page
  res.render('nutrition', { user: req.session.user });
});

// Profile route
router.get('/profile', (req, res) => {
  // Render profile page
  res.render('profile', { user: req.session.user });
});

// Blog Posts route
router.get('/blogPosts', (req, res) => {
  // Render blog posts page
  res.render('blogPosts', { user: req.session.user });
});

// Comments route
router.get('/comments', (req, res) => {
  // Render comments page
  res.render('comments', { user: req.session.user });
});

// Add more routes as needed

module.exports = router;