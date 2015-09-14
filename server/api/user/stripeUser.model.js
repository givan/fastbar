var config = require('../../config/environment')

var stripe = require("stripe")(
    config.stripeKey
);

var StripeUser = function StripeUser() {

    this.customer = {};

    this.getById = function (customerId, callback) {
        stripe.customers.retrieve(
            customerId,
            function (err, customer) {
                this.customer = customer;
                callback(err, customer);
            });
    }

    this.create = function create(callback) {
        stripe.customers.create(this.customer, function (err, customer) {
            console.log('customer created (err):' + JSON.stringify(err));
            console.log('customer created (customer):' + JSON.stringify(customer));

            this.customer = customer;
            callback(err, customer);
        });
    }

    this.update = function update(callback) {
        stripe.customers.update(this.customer.id, this.customer,
            function (err, customer) {
                console.log('customer updated: ');
                console.dir(customer);

                callback(err, customer);
            });
    }

    this.delete = function del(callback) {
        stripe.customers.del(
            this.customer.id,
            function (err, confirmation) {
                console.log('customer deleted: ' + JSON.stringify(confirmation));

                callback(err, this.customer.id);
            }
        );
    }
}

StripeUser.createInstance = function createInstance(id, name, email) {
    var newInstance = new StripeUser();
    newInstance.customer.description = name;
    newInstance.customer.email = email;

    if (id) {
        newInstance.customer.id = id;
    }

    return newInstance;
}

module.exports = exports = StripeUser;