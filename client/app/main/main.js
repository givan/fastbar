;(function(){
'use strict';
angular
  .module('fastbarApp')
  .config(Configuration);

  /* @ngInject */
  function Configuration($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  }
  
}).call(this);