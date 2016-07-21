var myApp = angular.module('myApp', ['ngResource']);

myApp.controller('mainController', ['$scope','$location', '$http', '$log', '$resource', '$timeout', function($scope, $location, $http, $log, $resource, $timeout) {

    $scope.name = 'Jane Doe';
    $scope.occupation = 'Coder';

    $scope.getname = function() {
        return $scope.name;
    }

    // $scope.getname =  {
    //     name: 'John Doe'
    // }
    $scope.$watch(function(){return $scope.name}, function(newValue, oldValue){
      $log.info('OldValue', oldValue);
      $log.info('NewValue', newValue);
    })

    setTimeout(function(){
      console.log('in Settimeout:', $scope)
      $scope.name = "Abhijit Choudhury"
      console.log('in Settimeout:', $scope.name)
      // $scope.$apply(function(){
      //   $log.info('timeout fired');
      //   $scope.name = 'Abhijit'
      // })
    }, 3000)


    $scope.getname.prototype.toString = function() {
      return 'New Name';
    }
    $log.info('$scope:', $scope, '$log: ', $log);
    $log.debug('$Scope Object:', $scope);

    // $timeout(function () {
    //   console.log('After 3 seconds',$scope.name)
    // }, 3100);
    //
}]);
