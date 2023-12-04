const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  country: { type: String, required: true },
  flagImageUrl: { type: String, required: true },
  continent: { type: String },
  iso: { type: String, required: true },
});

module.exports = mongoose.model('Country', countrySchema);
