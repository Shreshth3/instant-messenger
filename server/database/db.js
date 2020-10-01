const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define User schema
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
