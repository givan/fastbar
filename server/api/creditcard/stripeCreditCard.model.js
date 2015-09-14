var config = require('../../config/environment')

var stripe = require("stripe")(
    config.stripeKey
);

var StripeCreditCard = function StripeCreditCard() {
    this.creditCard = {};

    // id, customerId, ccNumber, ccCVC, expMonth, expYear, userName
    this.create = function create(stripeCustomerId, ccNumber, ccCVC, expMonth, expYear, userName, callback) {
        var self = this;

        stripe.customers.createSource(
            stripeCustomerId,
            {
                source: {
                    "object": "card",
                    "number": ccNumber,
                    "exp_month": expMonth,
                    "exp_year": expYear,
                    "name": userName,
                    "cvc": ccCVC
                }
            },
            function (err, card) {
                console.log('err' + err);
                console.log('card:' + JSON.stringify(card));

                self.creditCard = card;
                callback(err, card);
            }
        );
    };

    this.getById = function getById(stripeCustomerId, stripeCreditCardId, callback) {
        var self = this;

        stripe.customers.retrieveCard(
            stripeCustomerId,
            stripeCreditCardId,
            function (err, card) {
                console.log('credit card retrieved:');
                console.dir(card);

                self.creditCard = card;
                callback(err, card);
            }
        );
    };

    // id, customerId, ccNumber, ccCVC, expMonth, expYear, userName
    this.update = function update(stripeCustomerId, stripeCreditCardId, ccNumber, ccCVC, expMonth, expYear, userName, callback) {
        var self = this;

        // we only can update name, expiration info on an existing stripe credit card;
        // should consider deleting the card and adding a new one if the credit card number changes;
        stripe.customers.updateCard(
            stripeCustomerId,
            stripeCreditCardId,
            {
                "exp_month": expMonth,
                "exp_year": expYear,
                "name": userName
            },
            function (err, card) {
                console.log('credit card updated:');
                console.dir(card);

                self.creditCard = card;
                callback(err, card);
            }
        );
    };

    this.del = function del(stripeCustomerId, stripeCreditCardId, callback) {
        stripe.customers.deleteCard(
            stripeCustomerId,
            stripeCreditCardId,
            function (err, confirmation) {
                console.log('credit card deleted:' + JSON.stringify(confirmation));

                self.creditCard = {};
                callback(err, stripeCreditCardId);
            }
        );
    };
};

module.exports = exports = StripeCreditCard;
