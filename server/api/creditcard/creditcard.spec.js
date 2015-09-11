'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

var User = require('../../api/user/user.model');
var CreditCard = require('../../api/creditcard/creditcard.model');

describe('GET /api/creditcards', function () {

  var adminUser, adminCreditCard;

  before(function (done) {
    User.findOne({"email": "admin@admin.com"}, function (err, foundUser) {

      if (!foundUser) {
        User.create({
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'admin'
          },
          function (err, createdUser) {
            adminUser = createdUser;

            CreditCard.create({
                user_id: adminUser._id,
                name: adminUser.name,
                number: "1234",
                expiration: "12/17",
                cvc: "222",
                zip: "98109",
                stripe_id: "blahblah"
              },
              function (err, newCard) {
                adminCreditCard = newCard;

                console.log("CC is " + adminCreditCard._id);
                done();
              });

          });
      } else {
        adminUser = foundUser;

        CreditCard.findOne({"user_id": adminUser._id}, function (err, foundCard) {
          if (!foundCard) {
            CreditCard.create({
                user_id: adminUser._id,
                name: adminUser.name,
                number: "1234",
                expiration: "12/17",
                cvc: "222",
                zip: "98109",
                stripe_id: "blahblah"
              },
              function (err, newCard) {
                adminCreditCard = newCard;

                console.log("CC is " + adminCreditCard._id);
                done();
              })
          } else {
            adminCreditCard = foundCard;
            console.log("CC2 is " + adminCreditCard._id);
            done();
          }
        });
      }
    })
  });

  it('should respond with JSON array with the admin user CC', function (done) {
    request(app)
      .get('/api/creditcards/user/' + adminUser._id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with JSON object when retrieving a given CC', function (done) {
    request(app)
      .get('/api/creditcards/user/' + adminUser._id + '/creditcard/' + adminCreditCard._id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.should.have.property("_id", adminCreditCard._id.toString());
        done();
      });
  });
});
