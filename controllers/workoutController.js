const express = require('express');
const router = express.Router();
const { Workout } = require('../models');

// Workout Route
router.get('/', async (req, res) => {
  try {
    const savedWorkout = await Workout.findAll({ where: { userId: req.session.userId } });
    res.render('workout', { savedWorkout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/generate', async (req, res) => {
    try {
      // Your logic for generating workouts here
      const { duration, difficulty } = req.body;
      const newWorkout = await Workout.create({
        name: 'Generated Workout', // Modify this based on your logic
        duration,
        difficulty,
        userId: req.session.userId,
      });
      res.redirect('/workout');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;