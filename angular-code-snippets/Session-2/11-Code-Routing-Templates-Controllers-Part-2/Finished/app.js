// var myApp = angular.module('myApp', ['ngRoute']);
angular.element(document).ready(function() {
      angular.bootstrap(document, ['myApp']);
});
// angular.bootstrap(document, ['myApp']);
var myApp = angular.module('myApp', ['ngRoute','ngSanitize']);
    
myApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    
    .when('/second', {
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    })
    
    .when('/second/:num', {
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    });    
})
myApp.config(function($locationProvider){
    $locationProvider.html5Mode(true);
})
myApp.controller('mainController', ['$scope', '$log', '$sce',function($scope, $log, $sce) {
    
    // $scope.name = 'Main';
    $scope.name = $sce.trustAsHtml('<p>Main Controller</p>');
    
}]);

myApp.controller('secondController', ['$scope', '$log', '$routeParams', function($scope, $log, $routeParams) {
    
    $scope.num = $routeParams.num || 1;
    
}]);
