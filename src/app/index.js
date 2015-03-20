'use strict';

angular.module('iat381Final', ['ngAnimate', 'ngTouch', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })

      .when('/globe', {
        templateUrl: 'app/main/globe.html',
        controller: 'MainCtrl'
      })

       .when('/history', {
        templateUrl: 'app/main/history.html',
        controller: 'MainCtrl'
      })


      .otherwise({
        redirectTo: '/'
      });
  })
;
