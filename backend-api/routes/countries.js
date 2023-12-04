const express = require('express');
const router = express.Router();
const axios = require('axios');
const { parse } = require('csv-parse');
const Country = require('../models/country'); // Adjust the path accordingly

const csvUrl = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/csv/countries.csv';

// Utility function to parse CSV data
const parseCSV = (csvData) => {
  return new Promise((resolve, reject) => {
    parse(csvData, { columns: true }, (err, records) => {
      if (err) {
        reject(err);
      } else {
        resolve(records);
      }
    });
  });
};

// GET route to fetch and populate countries
router.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get(csvUrl);

    // Parse CSV data using the utility function
    const records = await parseCSV(response.data);
    const countries = [];

    for (const row of records) {
      const { name, iso2, region } = row;

      // Create a new Country object and push it to the countries array
      countries.push({
        country: name,
        iso: iso2,
        continent: region || '',
        flagImageUrl: `https://raw.githubusercontent.com/cristiroma/countries/main/data/flags/PNG-128/${iso2}-128.png`,
      });
    }

    // Populate the MongoDB collection with the countries array
    await Country.insertMany(countries);
    console.log('Countries inserted successfully.');

    res.status(200).json({ message: 'Countries fetched and populated successfully.', data: countries });
  } catch (error) {
    console.error('Error fetching or populating countries:', error);
    res.status(500).json({ message: `Error fetching or populating countries\n${error}`, data: {} });
  }
});

// DELETE route to remove all countries
router.delete('/remove', async (req, res) => {
  try {
    await Country.deleteMany({});
    res.status(200).json({ message: 'All countries removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting countries', data: {} });
  }
});

module.exports = router;
