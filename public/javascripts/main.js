var kpmg = angular.module('kpmg', ['ngRoute', 'ngFileUpload'])

kpmg.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        controller: 'FirstController as first',
        templateUrl: 'partials/first.html'
    })
    .when('/second', {
        controller: 'SecondController as second',
        templateUrl: 'partials/second.html'
    })
    .when('/upload', {
        controller: 'FileUploadController',
        templateUrl: 'partials/fileUpload.html'
    })
    $locationProvider.html5Mode(true);
})

kpmg.service('remoteService', ['$http', function ($http) {
    // this.remoteData = [{id:1},{id:2}, {id:3}, {id:4}, {id:5}];
    return $http.get('/api/voice-snippet');
}])

kpmg.controller('FirstController', ['$scope', 'remoteService', function ($scope, remoteService) {
    var self = this;
    self.title = "1st Page"
    self.remoteData = {};
    self.audioFileName = '';
    $scope.fileList = null;
    remoteService.then(function (res) {
        console.log('Data', res)
        self.remoteData.name = res.data.name;
        self.remoteData.stream = res.data.stream;
    }, function (err) {
        console.log('Error', err)
    });

    $scope.handleFilesCustomElement = function (element) {
        console.log('onchange', event.target.files[0].name)
        var filesList = event.target.files;
        document.getElementById('fileNames').innerHTML = (function (fl) {
            if (fl) {
                var keysList = Object.keys(fl);
                var kl = keysList.length;
                return kl > 0 ? (kl > 1 ? kl + ' files' : fl[kl - 1].name) : 'No files chosen';
            }
        })(event.target.files);
    }
    self.fileSelect = function (e) {
        console.log('Event on Anchor Tag: ', e)
        if (fileElem) {
            fileElem.click();
        }
    }
}])

kpmg.controller('SecondController', ['remoteService', function (remoteService) {
    var self = this;
    self.title = "2nd Page"
}])
