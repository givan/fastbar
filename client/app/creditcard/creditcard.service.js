;(function(){
'use strict';
angular
  .module('fastbarApp')
  .factory('Creditcard', Creditcard);

  /* @ngInject */
  function Creditcard($http) {

    // Define private variables here . . .

    // Define Public API
    var instance = {
      getCreditCardsForUser: getCreditCardsForUser,
      getUserCreditCardById: getUserCreditCardById,
      updateCreditCard : updateCreditCard,
      createCreditCard : createCreditCard
    };

    return instance;

    function getCreditCardsForUser(userId) {
      return $http.get('/api/creditcards/user/' + userId);
    }

    function getUserCreditCardById(userId, creditCardId) {
      // route: /user/:userId/creditcard/:id
      return $http.get('/api/creditcards/user/' + userId + '/creditcard/' + creditCardId);
    }

    function updateCreditCard(creditCard) {
      return $http.put('/api/creditcards/user/' + creditCard.user_id + "/creditcard/" + creditCard._id, creditCard);
    }

    function createCreditCard(creditCard) {
      return $http.post('/api/creditcards/user/' + creditCard.user_id, creditCard);
    }
  }

}).call(this);
