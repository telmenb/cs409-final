const express = require('express');
const axios = require('axios');
const router = express.Router();
const Quiz = require('../models/quiz');
const Country = require('../models/country');

router.get('/', async (req, res) => {
    try {
      // Make the API call
      let { amount, difficulty } = req.query;
      let quizData;

      if (!amount) {
        amount = 12;
      }

      if (!difficulty) {
        difficulty = 'easy';
      }

      let count = Math.floor(amount / 4);
      let countLast = amount - (3 * count);

      MCQuestions = await generateMCQuestions(count, difficulty);

      // Introduce a 5-second delay here
      await sleep(5000);

      TFQuestions = await generateTFQuestions(count, difficulty);

      flagQuestions = await generateFlagQuestions(count);
      regionQuestions = await generateRegionQuestions(countLast);

      quizData = MCQuestions.concat(TFQuestions);
      quizData = quizData.concat(flagQuestions);
      quizData = quizData.concat(regionQuestions);

      res.status(200).json({ message: 'Quiz created successfully', data: quizData});
    } catch (error) {
      res.status(500).json({ message: 'Error fetching and saving quizzes' + error, data: {}});
    }
  });

  router.delete('/', async (req, res) => {
    const id = req.params.id;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).send('Quiz deleted');
    } catch (err) {
        res.status(500).json({ message: 'Quiz question not found', data: {} });
    }
    
  });

  async function generateMCQuestions(amount, difficulty = 'easy') {
    const apiUrl = 'https://opentdb.com/api.php?amount=' + amount + '&category=22&difficulty=' + difficulty + '&type=multiple';
    const response = await axios.get(apiUrl);
    // Extract relevant data from the API response
    quizData = response.data.results;

    return quizData;
  } 

  router.post('/', async (req, res) => {
    try {
      await Quiz.create(req.body);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.sendStatus(201);
  });
  
  async function generateTFQuestions(amount, difficulty = 'easy') {
    const apiUrl = 'https://opentdb.com/api.php?amount=' + amount + '&category=22&difficulty=' + difficulty + '&type=boolean';
    const response = await axios.get(apiUrl);

    // Extract relevant data from the API response
    quizData = response.data.results;
    
    return quizData;
  }

  async function generateFlagQuestions(amount) {
    let quizData = []
    let countriesUsed = []
    for (let i = 0; i < amount; i++) {
      const totalCountries = await Country.countDocuments();
      let randomIndexes = [];
  
      while (randomIndexes.length < 4 && countriesUsed.length < totalCountries) {
        const randomIndex = Math.floor(Math.random() * totalCountries);
        if (!randomIndexes.includes(randomIndex) && !countriesUsed.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
          if (randomIndexes.length == 1) {
            // Push countries used to ensure the same flag isn't used more than once
            countriesUsed.push(randomIndex)
          }
        }
      }
  
      const randomCountries = await Country.find().skip(randomIndexes[0]).limit(4);
      
      quizData[i] = {
        question: 'Which country does this flag belong to?',
        imageUrl: randomCountries[0].flagImageUrl,
        incorrect_answers: [randomCountries[1].country, randomCountries[2].country, randomCountries[3].country],
        correct_answer: randomCountries[0].country,
      };
    }

    return quizData;    
  }

  async function generateRegionQuestions(amount) {
    const quizData = [];
    const regions = ['Africa', 'Asia', 'Europe', 'Americas', 'Oceania'];
    const countriesUsed = [];
  
    for (let i = 0; i < amount; i++) {
      const totalCountries = await Country.countDocuments();
      const randomIndex = Math.floor(Math.random() * totalCountries);
      const randomCountry = await Country.findOne().skip(randomIndex);
  
      // Ensure the same country is not used more than once
      if (!countriesUsed.includes(randomCountry.country)) {
        countriesUsed.push(randomCountry.country);
  
        // Choose a random continent from the list
        const correctRegion = randomCountry.continent;
  
        // Choose 3 random incorrect continents
        const incorrectRegions = regions
          .filter((continent) => continent !== correctRegion)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
  
        // Create the quiz question
        quizData[i] = {
          question: 'What region is ' + randomCountry.country + ' in?',
          incorrect_answers: incorrectRegions,
          correct_answer: correctRegion,
        };
      } else {
        // If the same country is used again, decrement the loop counter to retry
        i--;
      }
    }
  
    return quizData;
  }
  
  // Function to introduce a delay (sleep) in milliseconds
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  module.exports = router;
  
