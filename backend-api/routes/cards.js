const express = require('express');
const authGuard = require('../middleware/authGuard');
const router = express.Router();

const dummyData = [
  {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Map_of_USA_showing_unlabeled_state_boundaries.png/800px-Map_of_USA_showing_unlabeled_state_boundaries.png',
    backText: 'Image of the USA',
  },
  {
    imageUrl: 'https://www.50states.com/wp-content/uploads/2020/12/US-Blank-map.jpg',
    backText: 'Image of the USA',
  },
  {
    imageUrl: 'https://www.homemade-gifts-made-easy.com/image-files/blank-us-map-black-white-state-names-abbreviation-600x464.png',
    frontText: 'Image and text on front',
    backText: 'Image of the USA',
  },
  {
    imageUrl: 'https://www.homemade-gifts-made-easy.com/image-files/blank-us-map-black-white-state-names-abbreviation-600x464.png',
    frontText: 'Who has the biggest ego?\na. Brad\nb. David\nc. Lee\nd. Nick',
    backText: 'a. Brad',
  },
];

router.use(authGuard);

// Triggered when request is made to 'api/cards/'
router.get('/', (req, res) => {
  res.status(200).json({ cards: dummyData }).end();
});

module.exports = router;
