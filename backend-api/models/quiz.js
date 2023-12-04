const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  imageUrl: { type: String},
  incorrect_answers: { type: [String], required: true},
  correct_answer: {type: String, required: true},
});

module.exports = mongoose.model('Quiz', quizSchema);
