;(function(){
'use strict';
angular
  .module('fastbarApp')
  .config(Configuration);
  /* @ngInject */
  
  function Configuration($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  }
  
}).call(this);