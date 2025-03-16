const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

const Book = new mongoose.model('Book', bookSchema);

exports.BookModel = Book;
