var assert = require('assert');
var User = require('../models/user.js');
var Post = require("../models/post.js");

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

var user = chai.request.agent(server);



// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal(-1, [1,2,3].indexOf(4));
//     });
//   });
// });

    // user
//   .post('/session')
//   .send({ username: 'me', password: '123' })
//   .then(function (res) {
//     expect(res).to.have.cookie('sessionid');
//     // The `agent` now has the sessionid cookie saved, and will send it
//     // back to the server in the next request:
//     return agent.get('/user/me')
//       .then(function (res) {
//          expect(res).to.have.status(200);
//       })
//   })

describe('User', function() {
    it('should be able to signup', function (done) {
      user
        .post('/signup')
        .send({ email: 'test19@one.com', password: 'password' })
        .end(function (err, res){
          res.should.have.property('token')
          done();
        });

    });

});
