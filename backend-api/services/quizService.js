// Unused atm
const axios = require('axios');
const Quiz = require('../models/quiz');
const Country = require('../models/country');

async function generateTFQuestions(amount, difficulty = 'easy') {
  const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=22&difficulty=${difficulty}&type=boolean`;
  const response = await axios.get(apiUrl);
  return response.data.results;
}

async function generateMCQuestions(amount, difficulty = 'easy') {
  const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=22&difficulty=${difficulty}&type=multiple`;
  const response = await axios.get(apiUrl);
  return response.data.results;
}

async function generateFlagQuestions(amount, difficulty = 'easy') {
  let results;
  try {
    results = Quiz.find({ difficulty }).limit(amount);
  } catch (error) {
    console.log(error);
  }
  return results;
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
        question: `What region is ${randomCountry.country} in?`,
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
async function sleep(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms); });
}

module.exports = {
  generateFlagQuestions, generateMCQuestions, generateRegionQuestions, generateTFQuestions, sleep,
};
