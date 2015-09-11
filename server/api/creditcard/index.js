'use strict';

var express = require('express');
var controller = require('./creditcard.controller');

var router = express.Router();

router.get('/user/:userId', controller.getUserCreditCards);
router.get('/user/:userId/creditcard/:id', controller.getUserCreditCardById);
router.post('/user/:userId', controller.createUserCreditCard);
router.put('/user/:userId/creditcard/:id', controller.updateUserCreditCard);
router.delete('/user/:userId/creditcard/:id', controller.destroyUserCreditCard);

module.exports = router;
