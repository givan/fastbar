'use strict';

var _ = require('lodash');
var Creditcard = require('./creditcard.model');

// Get list of creditcards for a given user
exports.getUserCreditCards = function(req, res) {
  Creditcard.find({"user_id": req.params.userId}, function (err, creditcards) {
    if(err) { return handleError(res, err); }
    return res.json(200, creditcards);
  });
};

// Get a single creditcard
exports.getUserCreditCardById = function(req, res) {
  Creditcard.findOne({"_id": req.params.id, "user_id": req.params.userId}, function (err, creditcard) {
    if(err) { return handleError(res, err); }
    if(!creditcard) { return res.send(404); }
    return res.json(creditcard);
  });
};

// Creates a new creditcard in the DB.
exports.createUserCreditCard = function(req, res) {
  Creditcard.create(req.body, function(err, creditcard) {
    if(err) { return handleError(res, err); }
    return res.json(201, creditcard);
  });
};

// Updates an existing creditcard in the DB.
exports.updateUserCreditCard = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Creditcard.findById(req.params.id, function (err, creditcard) {
    if (err) { return handleError(res, err); }
    if(!creditcard) { return res.send(404); }
    var updated = _.merge(creditcard, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, creditcard);
    });
  });
};

// Deletes a creditcard from the DB.
exports.destroyUserCreditCard = function(req, res) {
  Creditcard.findById(req.params.id, function (err, creditcard) {
    if(err) { return handleError(res, err); }
    if(!creditcard) { return res.send(404); }
    creditcard.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
