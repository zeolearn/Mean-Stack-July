var myApp = angular.module('myApp', [])
myApp.controller('acController', ['$scope','$location','$http',function($scope,$location,$http){
    console.log('Location Object is:', $location)
    $scope.steps = [
        {
            id: 1,
            value: 'Personal Information'
        },
        {
            id: 2,
            value: 'Work Information'
        },
        {
            id: 3,
            value: 'Home Information'
        },
        {
            id: 4,
            value: 'Leisure Information'
        },
        {
            id: 5,
            value: 'Browsing Habits'
        },
        {
            id: 6,
            value: 'Assets'
        }
    ]       
    $scope.stepId = 0;
    console.log($scope.steps.length, 'steps')
    $scope.setStep = function(stepId) {
        $scope.stepId = stepId;
        $scope.stepValue = $scope.steps[stepId - 1].value;
        $scope.modInput = $scope.steps[stepId - 1].value
    }
    $scope.getStep = function() {
        return 
    }
    
}])
// $(document).ready(function(){
//     console.log("here we go!")
    
//     var currentStep = 0;

//     $("#step1").hide();
//     $("#step2").hide();

//     $("#btnStep1").click(function(){
        
//         $("#step1").show();
//         $("#step2").hide();
        
//         currentStep = 1;
        
//         //Other code to update the application data
//     })

//     $("#btnStep2").click(function(){

//         $("#step1").hide();
//         $("#step2").show();

//         currentStep = 2;

//         //Other code to update the application data
//     })

// });