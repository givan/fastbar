;(function(){
'use strict';
angular
  .module('fastbarApp')
  .config(Configuration);

  /* @ngInject */
  function Configuration($stateProvider) {
    // Creditcard state routing
    $stateProvider
      .state('creditcard', {
        url: '/creditcard/:creditcardId',
        templateUrl: 'app/creditcard/creditcard.html',
        controller: 'CreditcardCtrl',
        authenticate: true,
        resolve: {
          creditCardResponse: function($stateParams, Auth, Creditcard) {
              return Creditcard.getUserCreditCardById(Auth.getCurrentUser()._id, $stateParams.creditcardId);
          }
        },
      })
      .state('newCreditcard', {
        url: '/creditcard/new/',
        templateUrl: 'app/creditcard/creditcard.html',
        controller: 'NewCreditcardCtrl',
        authenticate: true
      });
  }

}).call(this);
