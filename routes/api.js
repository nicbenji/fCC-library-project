/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const {
  createBook,
  dropBooksCollection,
  addCommentToBook,
  findBookById,
  deleteBookById
} = require('../services/libraryService.js');

module.exports = function(app) {

  app.route('/api/books')
    .get(function(req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    .post(async function(req, res) {
      const title = req.body.title;
      //response will contain new book object including atleast _id and title
      try {
        const book = await createBook(title);
        return res.json(book);
      } catch (error) {
        return res.send(error.message);
      }
    })

    .delete(async function(_req, res) {
      try {
        await dropBooksCollection();
        return res.send('complete delete successful');
      } catch (error) {
        return res.send(error.message);
      }
    });



  app.route('/api/books/:id')
    .get(async function(req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      try {
        const book = await findBookById(bookid);
        return res.json(book);
      } catch (error) {
        return res.send(error.message);
      }
    })

    .post(async function(req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      try {
        const book = await addCommentToBook(bookid, comment);
        return res.json(book);
      } catch (error) {
        return res.send(error.message);
      }
    })

    .delete(async function(req, res) {
      let bookid = req.params.id;

      try {
        await deleteBookById(bookid);
        return res.send('delete successful');
      } catch (error) {
        console.error(error);
        return res.send(error.message);
      }
    });

};
