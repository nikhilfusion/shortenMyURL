require('../server/index.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = require('chai').assert;
const expect = require('chai').expect;
const request = require('request');
const uniqueUrlCode = require('../server/middlewares/uniqueUrlCode');
describe("unique url code generated", function() {
  it('Unique URL code is not empty', function() {
    assert.isNotEmpty(uniqueUrlCode.generate());
  })
})

describe('Post call to get the unique url', function() {
  describe('POST /api/item', function() {
    it('get the unique url', function(done) {
      chai
        .request('http://34.245.45.123:7000')
        .post('/api/item')
        .send({
          shortBaseUrl: 'http://34.245.45.123',
          originalUrl: 'https://www.flipkart.com/realme-2-diamond-black-64-gb/p/itmf8maypywnh63w?pid=MOBF85UYCDDFVEDM&lid=LSTMOBF85UYCDDFVEDMVICAUM&marketplace=FLIPKART&sattr[]=color&sattr[]=storage&sattr[]=ram&st=ram'
        })
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          done();
        });
    })
  })
})

describe('redirect to the right path', function() {
  describe('get /api/item/:code', function() {
    describe ('success', function() {
      it('redirects to the right path', function(done) {
        request.get({
          url: 'http://34.245.45.123:7000/api/item/lpu0nKxwM'
        }, function(err, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        })
      })
    })
  })
})        