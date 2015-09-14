'use strict';

var _ = require('lodash');
var User = require('../user/user.model');
var Creditcard = require('./creditcard.model');
var StripeCreditCard = require('./stripeCreditCard.model');
var ClientError = require('../errorHandling/ClientError')

// Get list of creditcards for a given user
exports.getUserCreditCards = function (req, res) {
    Creditcard.find({"user_id": req.params.userId}, function (err, creditcards) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, creditcards);
    });
};

// Get a single creditcard
exports.getUserCreditCardById = function (req, res) {
    Creditcard.findOne({"_id": req.params.id, "user_id": req.params.userId}, function (err, creditcard) {
        if (err) {
            return handleError(res, err);
        }
        if (!creditcard) {
            return res.send(404);
        }
        return res.json(creditcard);
    });
};

// Creates a new creditcard in the DB.
exports.createUserCreditCard = function (req, res) {

    // get the stripe user id first
    User.findById(req.params.userId, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);

        // now create a new stripe card
        var newCardData = req.body;

        var stripeCard = new StripeCreditCard();
        stripeCard.create(user.stripeId, newCardData.number, newCardData.cvc, newCardData.expiration_month, newCardData.expiration_year, newCardData.name, function (err, stripeCreditCard) {
            if (err) {
                return handleError(res, err);
            }

            // add the stripe id to the credit card object we store in our DB
            newCardData.stripe_id = stripeCreditCard.id;

            Creditcard.create(newCardData, function (err, creditcard) {
                if (err) {
                    return handleError(res, err);
                }
                return res.json(201, creditcard);
            });
        })
    });
};

// Updates an existing creditcard in the DB.
exports.updateUserCreditCard = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }

    Creditcard.findById(req.params.id, function (err, creditcard) {
        if (err) {
            return handleError(res, err);
        }
        if (!creditcard) {
            return res.send(404);
        }

        // now also make sure we have a valid Stripe credit card as well
        // for this first we need to retrieve user's stripe id
        User.findById(creditcard.user_id, function (err, user) {
            if (err) {
                return handleError(res, err);
            }

            if (!user) {
                var error = ClientError.createInstance(1, "There is no user with the specified id: " + creditcard.user_id);
                return res.json(404, error);
            }

            var stripeCard = new StripeCreditCard();
            stripeCard.getById(user.stripeId, creditcard.stripe_id, function (err, stripeCreditCard) {
                if (err) {
                    return handleError(res, err);
                }

                if (!stripeCreditCard) {
                    var error = ClientError.createInstance(1, "There is no stripe credit card with the specified id: " + creditcard.stripe_id);
                    return res.json(404, error);
                }

                var updated = _.merge(creditcard, req.body);

                stripeCard.update(
                    user.stripeId,
                    creditcard.stripe_id,
                    updated.number,
                    updated.cvc,
                    updated.expiration_month, updated.expiration_year,
                    updated.name,
                    function (err, updatedCard) {
                        if (err) {
                            return handleError(res, err);
                        }

                        if (!updatedCard) {
                            var error = ClientError.createInstance(2, "Failed to update stripe credit card with the specified id: " + creditcard.stripe_id);
                            return res.json(404, error);
                        }

                        updated.save(function (err) {
                            if (err) {
                                return handleError(res, err);
                            }
                            return res.json(200, creditcard);
                        });
                    });
            });
        })


    });
};

// Deletes a creditcard from the DB.
exports.destroyUserCreditCard = function (req, res) {
    Creditcard.findById(req.params.id, function (err, creditcard) {
        if (err) {
            return handleError(res, err);
        }
        if (!creditcard) {
            return res.send(404);
        }
        creditcard.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
