/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const { createBook } = require('../services/libraryService.js')

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
        console.error(error);
        return res.send(error.message);
      }
    })

    .delete(function(req, res) {
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function(req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function(req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })

    .delete(function(req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });

};
