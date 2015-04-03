'use strict';

angular.module('iat381Final', ['ngAnimate', 'ngTouch', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider

      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })

      .when('/convert', {
        templateUrl: 'app/convert/convert.html',
        controller: 'MainCtrl'
      })

       .when('/history', {
        templateUrl: 'app/history/history.html',
        controller: 'MainCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  })
;


function historyCtrl($scope) {

  $scope.histories = [];


  $scope.addhistory = function () {
    $scope.histories.push({text:$scope.formTodoText, done:false});
    $scope.formTodoText = '';
  };


}

angular.module('scopeExample', [])
.controller('GreetController', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.name = 'World';
  $rootScope.department = 'Angular';
}])
.controller('ListController', ['$scope', function($scope) {
  $scope.names = ['Igor', 'Misko', 'Vojta'];
}]);



angular.module('toDo',[])

.service('dataService', function() {
  // private variable
  var _dataObj = {};

  this.dataObj = _dataObj;
})

.controller('One', function($scope, dataService) {
  $scope.data = dataService.dataObj;
})

.controller('Two', function($scope, dataService) {
  $scope.data = dataService.dataObj;
})

;
