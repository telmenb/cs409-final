const express = require('express');
const authGuard = require('../middleware/authGuard');
const Quiz = require('../models/quiz');
const router = express.Router();

router.use(authGuard);

router.get('/', async (req, res) => {
  let { amount, difficulty } = req.query;
  if (!amount || Number.isNaN(amount)) {
    amount = 12;
  }
  if (!difficulty || !(['easy', 'medium', 'hard'].includes(difficulty))) {
    difficulty = 'easy';
  }
  let data;
  try {
    data = await Quiz.aggregate([
      { $match: { difficulty } },
      { $sample: { size: parseInt(amount, 10) } },
    ]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  res.status(200).json(data);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Quiz.findByIdAndDelete(id);
    res.status(200).send('Quiz deleted');
  } catch (err) {
    res.status(500).json({ message: 'Quiz question not found', data: {} });
  }
});

router.delete('/', async (req, res) => {
  await Quiz.deleteMany({});
  res.status(200).send('Quiz collection cleared');
});

router.post('/', async (req, res) => {
  try {
    await Quiz.create(req.body);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  res.sendStatus(201);
});

module.exports = router;
