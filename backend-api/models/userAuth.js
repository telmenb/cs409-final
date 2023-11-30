const mongoose = require('mongoose');

const UserAuthSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserAuth', UserAuthSchema);
