const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/workouts', async (req, res) => {
    try {
        const userId = req.session.user.id; 
        const workouts = await db.Workout.findAll({
            where: { UserId: userId }
        });
        res.json(workouts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/workouts', async (req, res) => {
    const { name, duration, intensity, caloriesBurned, distance, repetitions, sets } = req.body;
    try {
        const userId = req.session.user.id; 
        const newWorkout = await db.Workout.create({
            name,
            duration,
            intensity,
            caloriesBurned,
            distance,
            repetitions,
            sets,
            UserId: userId
        });
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/workouts/:id', async (req, res) => {
    try {
        const userId = req.session.user.id; 
        const workout = await db.Workout.findOne({
            where: { id: req.params.id, UserId: userId }
        });
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
        } else {
            res.json(workout);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/workouts/:id', async (req, res) => {
    const { name, duration, intensity, caloriesBurned, distance, repetitions, sets } = req.body;
    try {
        const userId = req.session.user.id; 
        const updatedWorkout = await db.Workout.update(
            { name, duration, intensity, caloriesBurned, distance, repetitions, sets },
            { where: { id: req.params.id, UserId: userId } }
        );
        if (updatedWorkout[0] === 0) {
            res.status(404).json({ error: 'Workout not found' });
        } else {
            res.json({ message: 'Workout updated successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/workouts/:id', async (req, res) => {
    try {
        const userId = req.session.user.id; 
        const deletedWorkout = await db.Workout.destroy({
            where: { id: req.params.id, UserId: userId }
        });
        if (deletedWorkout === 0) {
            res.status(404).json({ error: 'Workout not found' });
        } else {
            res.json({ message: 'Workout deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
