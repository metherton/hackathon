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
    'ui.router'
  ])
  //.config(function () {
    .config(function ($stateProvider, $urlRouterProvider) {
    //$stateProvider
    //  .when('/', {
    //    templateUrl: 'views/main.html',
    //    controller: 'MainCtrl',
    //    controllerAs: 'main'
    //  })
    //  .when('/about', {
    //    templateUrl: 'views/about.html',
    //    controller: 'AboutCtrl',
    //    controllerAs: 'about'
    //  })
    //  .otherwise({
    //    redirectTo: '/'
    //  });

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
