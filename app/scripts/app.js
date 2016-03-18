'use strict';

/**
 * @ngdoc overview
 * @name inghackathonclientApp
 * @description
 * # inghackathonclientApp
 *
 * Main module of the application.
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
        'header': {
          templateUrl : 'views/header.html',
        },
        'content': {
          templateUrl : 'views/main.html',
          controller  : 'MainCtrl'
        },
        'footer': {
          templateUrl : 'views/footer.html',
        }
      }

    })
    // route for the aboutus page
    .state('app.sms', {
      url:'sms',
      views: {
        'content@': {
          templateUrl : 'views/sms.html',
          controller  : 'SmsCtrl'
        }
      }
    })
    .state('app.customerdetails', {
      url:'customerdetails',
      views: {
        'content@': {
          templateUrl : 'views/customerdetails.html',
          controller  : 'CustomerDetailsCtrl',
          controllerAs : 'vm'
        }
      }
    })
    // route for the aboutus page
    .state('app.aboutus', {
      url:'aboutus',
      views: {
        'content@': {
          templateUrl : 'views/about.html',
          controller  : 'AboutCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/');

});
