var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/second.html',
            controller: 'secondController as second'
        })

        .when('/second', {
            templateUrl: 'pages/main.html',
            controller: 'mainController as main'
        })

        .when('/second/:num', {
            templateUrl: 'pages/second.html',
            controller: 'secondController as second'
        })
    $locationProvider.html5Mode(true);
});

myApp.filter('reverse', function () {
    return function (input, uppercase, mask) {
        this.mask = mask;
        input = input || '';
        var out = "";
        for (var i = 0; i < input.length; i++) {
            out = input.charAt(i) + out;
        }
        // conditional based on optional argument
        if (uppercase) {
            out = out.toUpperCase();
        }
        if (mask) {
            console.log('Masking filter')
        }
        return out;
    };
})

myApp.controller('mainController', ['$log', 'reverseFilter', function ($log, reverseFilter) {

    this.inputString = ''
    this.runReverse = function () {
        this.outputString = reverseFilter(this.inputString, true);
    }
    // 
    // this.person = {
    //     name: 'Rajesh Sharma',
    //     address: '234 Main St., New York, NY 11111'
    // }


}]);
myApp.run(['reverseFilter',function(reverseFilter){
    console.log('Runblock: ',reverseFilter)
}])

myApp.controller('secondController', ['$scope', '$log', '$routeParams', function ($scope, $log, $routeParams) {
    console.log('Second Controller initialized');
    var persons = [
        {
            name: "Rajesh Sharma",
            address: "Plot No. 234, 2nd Cross., BTM Layout, Bengaluru 560012"
        },
        {
            name: 'John Doe',
            address: '100 Main St., East Brunswick, NY 08816'
        }

    ]
    /**
     <a href="#" class="list-group-item">
    <h4 class="list-group-item-heading">{{personObject.name}}</h4>
    <p class="list-group-item-text">{{personObject.address}}</p>
</a>

     */

    this.person = persons[0];
    this.personName = this.person.name;
    $scope.person = persons[1];
    this.setName = function () {
        console.log('SetName called from Directive')
    }


}]);

myApp.directive("searchResult", ['$interval', '$document', function ($interval, $document) {
    var searchCtrl = function() {
        var srCtrl = this;
        function init(){
            srCtrl.personObject = angular.copy(srCtrl.person);
        }
        init();
        console.log('search-results Controller: ', srCtrl.personObject)
        srCtrl.personObject.name = "Roger Rabbit";
        // srCtrl.persObject.address = srCtrl.person.address;
        srCtrl.templateFn = srCtrl.dFunction;
    }
    var directive = {
        restrict: 'AE', //Angular recommends using 'AE' and avoid using 'CM'
        templateUrl: 'directives/addressBook.html',
        replace: true,
        transclude: true,
        controller: searchCtrl,
        controllerAs: 'srCtrl',
        bindToController: true,
        scope: {
            person: "=person", //@ is used to receive the value of the attribute, '=' is used for two way binding. 
            dFunction: "&calledFunction"
        },
        // compile: function (elem, attr) {
        //     return {
        //         pre: function preLink(scope, elem, attr/*, controller*/) {
        //             //
        //             console.log('Element Object is: ', elem)
        //             elem.css({
        //                 color: "blue",
        //                 fontSize: "larger"
        //             })

        //             $document.on('mouseover', function () {
        //                 elem.css({
        //                     color: "red",
        //                     fontSize: "larger"
        //                 })
        //             })
        //             $document.on('mouseout', function () {
        //                 elem.css({
        //                     color: "blue",
        //                     fontSize: "larger"
        //                 })
        //             })

        //         },
        //         post: function postLink(scope, elem, attr) {
        //             //
        //             console.log('Element Object is: ', elem)
        //             elem.css({
        //                 color: "green",
        //                 fontSize: "larger"
        //             })
        //             scope.person.name = 'Adam Smith';
        //         }
        //     }
        // }
        link: function (scope, elem, attr) {
            //
            console.log('Element Object is: ', elem)
            elem.css({
                color: "green",
                fontSize: "larger"
            })
            console.log('Scope - Person', scope.srCtrl.person)
        }
    }
    return directive;
}]);
myApp.directive("addressBook", ['$interval', function ($interval) {
    return {
        restrict: 'AECM',
        templateUrl: 'directives/addressBook.html',
        replace: true,
        scope: {
        },
    }
}]);
