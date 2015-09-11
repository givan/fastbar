;
(function () {
  'use strict';
  angular
    .module('fastbarApp')
    .controller('CreditcardCtrl', CreditcardCtrl)
    .controller('NewCreditcardCtrl', NewCreditcardCtrl);

  /* @ngInject */
  function CreditcardCtrl($scope, $location, creditCardResponse, Creditcard) {
    $scope.creditCard = creditCardResponse.data;

    $scope.save = function save(creditCard) {
      return Creditcard.updateCreditCard(creditCard).
        success(function () {
          $location.path("/welcome");
        }).
        error(function (error) {
          $scope.errorMessage = error;
          console.log(error);
        });
    };

    $scope.cancel = function cancel() {
      $location.path("/welcome");
    }
  }

  /* @ngInject */
  function NewCreditcardCtrl($scope, $location, Creditcard, Auth) {

    var user = Auth.getCurrentUser();

    $scope.creditCard = {user_id: user._id, name: user.name};

    $scope.save = function save(creditCard) {

      return Creditcard.createCreditCard(creditCard).success(function () {
        $location.path("/welcome");
      }).
        error(function (error) {
          $scope.errorMessage = error;
          console.log(error);
        });
    };

    $scope.cancel = function cancel() {
      $location.path("/welcome");
    }
  }

}).call(this);
