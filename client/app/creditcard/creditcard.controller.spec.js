'use strict';

describe('Controller: CreditcardCtrl', function () {

  // load the controller's module
  beforeEach(module('fastbarApp'));

  var CreditcardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreditcardCtrl = $controller('CreditcardCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
