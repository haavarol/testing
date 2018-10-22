const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
  // Auto-generates unique IDs
  name:String,
  age: Number,
})

module.exports = mongoose.model('Author', authorSchema);