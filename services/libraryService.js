const mongoose = require('mongoose');
const { BookModel } = require('../models/librarySchemas');

async function createBook(title) {
  if (!title) {
    throw new Error('missing required field title');
  }

  const newBook = new BookModel({
    title
  });
  const savedBook = await newBook.save();
  return savedBook;
}

async function getAllBooksWithCommentCount() {
  const books = await BookModel.aggregate([
    {
      $project: {
        title: 1,
        _id: 1,
        commentcount: { $size: '$comments' }
      }
    }
  ]);
  return books;
}

async function findBookById(bookId) {
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    throw new Error('no book exists');
  }

  const book = await BookModel.findById(bookId);
  if (!book) {
    throw new Error('no book exists');
  }
  return book;
}

async function deleteBookById(bookId) {
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    throw new Error('no book exists');
  }

  const result = await BookModel.findByIdAndDelete(bookId);
  if (!result) {
    throw new Error('no book exists');
  }
}

async function addCommentToBook(bookId, comment) {
  if (!comment) {
    throw new Error('missing required field comment');
  }

  const book = await findBookById(bookId);
  book.comments.push(comment);
  const newBook = await book.save();
  return newBook;
}

async function dropBooksCollection() {
  await BookModel.collection.drop();
}

exports.createBook = createBook;
exports.getAllBooksWithCommentCount = getAllBooksWithCommentCount;
exports.findBookById = findBookById;
exports.deleteBookById = deleteBookById;
exports.addCommentToBook = addCommentToBook;
exports.dropBooksCollection = dropBooksCollection;

