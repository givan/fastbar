;
(function () {
  'use strict';
  angular
    .module('fastbarApp')
    .controller('WelcomeCtrl', WelcomeCtrl);

  /* @ngInject */
  function WelcomeCtrl($scope, Auth, Creditcard) {
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.getUserCreditCard = function getUserCreditCard() {
      return Creditcard.getCreditCardsForUser(Auth.getCurrentUser()._id)
        .success(function (data) {
          // the user currently has only 1 credit card
          $scope.creditCard = data[0];
        });
    };
  }

}).call(this);
