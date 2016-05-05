'use strict';

/**
 * @ngdoc 		overview
 * @name 		inghackathonclientApp
 * @description	Main module of the application.
 */
angular
  .module('inghackathonclientApp', [
    'ngResource',
    'ui.router',
    'inghackathonclientApp.services'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider

  // route for the home page
    .state('app', {
      url:'/',
      views: {
        'content@': {
          templateUrl : 'views/customerdetails.html',
          controller  : 'CustomerDetailsCtrl',
          controllerAs : 'vm'
        }
      }
    });

  $urlRouterProvider.otherwise('/');

});
