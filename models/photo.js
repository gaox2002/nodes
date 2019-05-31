const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: { type: String },
  authName: { type: String },
  authNickName: { type: String },
  imageName: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);