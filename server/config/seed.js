/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var StripeUser = require('../api/user/stripeUser.model');
var CreditCard = require('../api/creditcard/creditcard.model');
var StripeCreditCard = require('../api/creditcard/stripeCreditCard.model');

Thing.find({}).remove(function () {
    Thing.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
    }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
    }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
    }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
    }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
    });
});

User.find({}).remove(function () {
    var testUser = {
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    };

    var stripeTestUser = StripeUser.createInstance(null, testUser.name, testUser.email);

    stripeTestUser.create(function (err, customer) {
        console.log("stripeTest.create(err): " + JSON.stringify(err));
        console.log("stripeTest.create(customer): " + JSON.stringify(customer));

        testUser.stripeId = customer.id;

        User.create(testUser, function () {

                CreditCard.find({}).remove(function () {
                    User.findOne({"email": testUser.email}, function (err, testUser) {
                        console.log('found test user: ' + JSON.stringify(testUser));

                        var testCreditCard = {
                            user_id: testUser._id,
                            name: testUser.name,
                            number: "4242424242424242",
                            expiration_month: "11",
                            expiration_year: "16",
                            zip: "98109",
                            cvc: "111",
                            stripe_id: "blahblah",
                        };

                        var stripeCard = new StripeCreditCard();

                        stripeCard.create(
                            testUser.stripeId,
                            testCreditCard.number,
                            testCreditCard.cvc,
                            testCreditCard.expiration_month,
                            testCreditCard.expiration_year,
                            testUser.name,
                            function (err, card) {
                                console.log('created STRIPE card (err): ' + JSON.stringify(err));
                                console.log('created STRIPE card: ' + JSON.stringify(card));

                                testCreditCard.stripe_id = card.id;

                                CreditCard.create(testCreditCard, function () {
                                    console.log('finished populating credit card for test user');
                                })
                            });

                    })
                });
            }
        );
    });

    var adminUser = {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin'
    };

    var stripeAdminUser = StripeUser.createInstance(null, adminUser.name, adminUser.email);

    stripeAdminUser.create(function (err, customer) {
        console.log("err: " + JSON.stringify(err));
        console.log("stripeAdminUser.create()");
        console.dir(customer);

        adminUser.stripeId = customer.id;

        User.create(adminUser, function () {
                console.log('finished creating the admin user. he has no credit card');
            }
        );
    });
});

