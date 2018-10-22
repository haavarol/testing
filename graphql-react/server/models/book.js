const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  // Auto-generates unique IDs
  name:String,
  genre:String,
  authorId: String
})

module.exports = mongoose.model('Book', bookSchema);