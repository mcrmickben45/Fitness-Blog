const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/nutrition', async (req, res) => {
  try {
    const userId = req.session.user.id; 
    const nutritionEntries = await db.Nutrition.findAll({
      where: { UserId: userId }
    });
    res.json(nutritionEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/nutrition', async (req, res) => {
  const { foodName, calories, protein, carbohydrates, fats, fiber, sugar, servings } = req.body;
  try {
    const userId = req.session.user.id; 
    const newNutritionEntry = await db.Nutrition.create({
      foodName,
      calories,
      protein,
      carbohydrates,
      fats,
      fiber,
      sugar,
      servings,
      UserId: userId
    });
    res.status(201).json(newNutritionEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/nutrition/:id', async (req, res) => {
  try {
    const userId = req.session.user.id; 
    const nutritionEntry = await db.Nutrition.findOne({
      where: { id: req.params.id, UserId: userId }
    });
    if (!nutritionEntry) {
      res.status(404).json({ error: 'Nutrition entry not found' });
    } else {
      res.json(nutritionEntry);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/nutrition/:id', async (req, res) => {
  const { foodName, calories, protein, carbohydrates, fats, fiber, sugar, servings } = req.body;
  try {
    const userId = req.session.user.id; 
    const updatedNutritionEntry = await db.Nutrition.update(
      { foodName, calories, protein, carbohydrates, fats, fiber, sugar, servings },
      { where: { id: req.params.id, UserId: userId } }
    );
    if (updatedNutritionEntry[0] === 0) {
      res.status(404).json({ error: 'Nutrition entry not found' });
    } else {
      res.json({ message: 'Nutrition entry updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/nutrition/:id', async (req, res) => {
  try {
    const userId = req.session.user.id; 
    const deletedNutritionEntry = await db.Nutrition.destroy({
      where: { id: req.params.id, UserId: userId }
    });
    if (deletedNutritionEntry === 0) {
      res.status(404).json({ error: 'Nutrition entry not found' });
    } else {
      res.json({ message: 'Nutrition entry deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
