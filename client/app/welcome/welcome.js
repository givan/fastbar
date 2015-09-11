;(function(){
'use strict';
angular
  .module('fastbarApp')
  .config(Configuration);

  /* @ngInject */
  function Configuration($stateProvider) {
    // Welcome state routing
    $stateProvider
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'app/welcome/welcome.html',
        controller: 'WelcomeCtrl',
        authenticate: true
      });
  }

}).call(this);
