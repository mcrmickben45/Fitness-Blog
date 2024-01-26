const express = require('express');
const router = express.Router();
const { Nutrition } = require('../models');

// Nutrition Route
router.get('/', async (req, res) => {
  try {
    const savedNutrition = await Nutrition.findAll({ where: { userId: req.session.userId } });
    res.render('nutrition', { savedNutrition });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/food', async (req, res) => {
    try {
        const newNutrition = await Nutrition.create({
            foodName: req.body.foodName,
            nutrients: req.body.nutrients,
            userId: req.session.userId,
        });
        res.redirect('/nutrition');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API to delete nutrition data
router.delete('/food/:id', async (req, res) => {
  try {
    const nutritionId = req.params.id;
    await Nutrition.destroy({ where: { id: nutritionId } });
    res.redirect('/nutrition');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;