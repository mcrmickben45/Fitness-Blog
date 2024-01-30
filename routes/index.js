const express = require('express');
const router = express.Router();

const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes');
const workoutRoutes = require('./workoutRoutes');
const nutritionRoutes = require('./nutritionRoutes');
const profileRoutes = require('./profileRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/api/blog', blogRoutes);
router.use('/api/user', userRoutes);
router.use('/api/workout', workoutRoutes);
router.use('/api/nutrition', nutritionRoutes);
router.use('/api/profile', profileRoutes);
router.use('/api/comment', commentRoutes);

module.exports = router;
