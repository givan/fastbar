;(function(){
'use strict';
angular
  .module('fastbarApp')
  .factory('User', User);

  /* @ngInject */
  function User($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
    });
  }
}).call(this);