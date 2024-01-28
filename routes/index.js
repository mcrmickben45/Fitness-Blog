const express = require('express');
const router = express.Router();

// Import API routes
const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes');
const workoutRoutes = require('./workoutRoutes');
const nutritionRoutes = require('./nutritionRoutes');
const profileRoutes = require('./profileRoutes');
const commentRoutes = require('./commentRoutes');

// Use API routes
router.use('/api', blogRoutes);
router.use('/api', userRoutes);
router.use('/api', workoutRoutes);
router.use('/api', nutritionRoutes);
router.use('/api', profileRoutes);
router.use('/api', commentRoutes);

module.exports = router;