;(function(){
'use strict';
angular
  .module('fastbarApp')
  .controller('NavbarCtrl', NavbarCtrl);

  /* @ngInject */
  function NavbarCtrl($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/welcome'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }

}).call(this);
