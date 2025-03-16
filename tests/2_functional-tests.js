/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const ObjectId = require('mongoose').Types.ObjectId;

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done) {
    chai.request(server)
      .get('/api/books')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {

    const invalidId = 34;
    let testId;

    suite('POST /api/books with title => create book object/expect book object', function() {

      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({ title: 'Test Book' })
          .end((_err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.property(res.body, 'title');
            assert.property(res.body, '_id');
            assert.propertyVal(res.body, 'title', 'Test Book');
            testId = res.body._id;
            done();
          });
      });

      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({ title: '' })
          .end((_err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, 'missing required field title');
            done();
          });
      });

    });


    suite('GET /api/books => array of books', function() {

      test('Test GET /api/books', function(done) {
        chai.request(server)
          .get('/api/books')
          .end(function(_err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');
            done();
          });
      });

    });


    suite('GET /api/books/[id] => book object with [id]', function() {

      test('Test GET /api/books/[id] with id not in db', function(done) {
        chai.request(server)
          .get(`/api/books/${invalidId}`)
          .end((_err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, 'no book exists');
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', function(done) {
        chai.request(server)
          .get(`/api/books/${testId}`)
          .end((_err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.property(res.body, 'title');
            assert.property(res.body, '_id');
            assert.property(res.body, 'comments');
            assert.propertyVal(res.body, '_id', testId);
            done();
          });
      });

    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function() {

      test('Test POST /api/books/[id] with comment', function(done) {
        chai.request(server)
          .post(`/api/books/${testId}`)
          .send({ comment: 'Test comment' })
          .end((_err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.property(res.body, 'title');
            assert.property(res.body, '_id');
            assert.property(res.body, 'comments');
            assert.propertyVal(res.body, '_id', testId);
            assert.isTrue(res.body.comments.includes('Test comment'));
            done();
          });
      });

      test('Test POST /api/books/[id] without comment field', function(done) {
        chai.request(server)
          .post(`/api/books/${testId}`)
          .send({ comment: '' })
          .end((_err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, 'missing required field comment');
            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done) {
        chai.request(server)
          .post(`/api/books/${invalidId}`)
          .send({ comment: 'Test comment' })
          .end((_err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, 'no book exists');
            done();
          });
      });

    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done) {
        chai.request(server)
          .delete(`/api/books/${testId}`)
          .end((_err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, 'delete successful');
            done();
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done) {
        chai.request(server)
          .delete(`/api/books/${invalidId}`)
          .end((_err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, 'no book exists');
            done();
          });
      });

    });


  });

});
