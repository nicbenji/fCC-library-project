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

exports.createBook = createBook;
