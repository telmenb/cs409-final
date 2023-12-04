const express = require('express');
const axios = require('axios');
const router = express.Router();
const Quiz = require('../models/quiz');

router.get('/fetch', async (req, res) => {
    try {
      // Make the API call
      const apiUrl = 'https://opentdb.com/api.php?amount=2&category=22&difficulty=easy&type=multiple';
      const response = await axios.get(apiUrl);
  
      // Extract relevant data from the API response
      const quizData = response.data.results.map((result) => {
        return {
          question: result.question,
          imageUrl: result.imageUrl, // Add image URL if available in the API response
          incorrect_answers: result.incorrect_answers,
          correct_answer: result.correct_answer,
        };
      });
  
      // Save the data to the MongoDB using Mongoose
      await Quiz.create(quizData);
  
      res.status(200).json({ message: 'Quizzes saved successfully', data: quizData });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching and saving quizzes', data: {}});
    }
  });

  router.delete('/remove', async (req, res) => {
    const id = req.params.id;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).send('Quiz deleted');
    } catch (err) {
        res.status(500).json({ message: "Quiz question not found", data: {} });
    }
    
  });
  
  module.exports = router;
  
