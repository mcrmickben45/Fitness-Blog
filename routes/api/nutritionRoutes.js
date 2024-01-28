const express = require('express');
const router = express.Router();
const db = require('../../models');

// Get all nutrition entries for a user
router.get('/nutrition', async (req, res) => {
  try {
    const userId = req.session.user.id; // Assuming user is authenticated
    const nutritionEntries = await db.Nutrition.findAll({
      where: { UserId: userId }
    });
    res.json(nutritionEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new nutrition entry for a user
router.post('/nutrition', async (req, res) => {
  const { foodName, calories, protein, carbohydrates, fats, fiber, sugar, servings } = req.body;
  try {
    const userId = req.session.user.id; // Assuming user is authenticated
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

// Get a specific nutrition entry for a user
router.get('/nutrition/:id', async (req, res) => {
  try {
    const userId = req.session.user.id; // Assuming user is authenticated
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

// Update a specific nutrition entry for a user
router.put('/nutrition/:id', async (req, res) => {
  const { foodName, calories, protein, carbohydrates, fats, fiber, sugar, servings } = req.body;
  try {
    const userId = req.session.user.id; // Assuming user is authenticated
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

// Delete a specific nutrition entry for a user
router.delete('/nutrition/:id', async (req, res) => {
  try {
    const userId = req.session.user.id; // Assuming user is authenticated
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