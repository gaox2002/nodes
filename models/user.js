const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  nickName: { type: String },
  email: { type: String },
  phone: { type: String },
  role: {type: String},
  done: { type: Boolean },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);