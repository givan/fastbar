'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CreditcardSchema = new Schema({
  user_id: { type: String, required: true},
  name: { type: String, required: true},
  number: { type: String, required: true},
  expiration_month: { type: String, required: true},
  expiration_year: { type: String, required: true},
  zip: { type: String, required: true},
  cvc: { type: String, required: true},
  stripe_id: { type: String},
});

module.exports = mongoose.model('CreditCard', CreditcardSchema);
