kpmg.controller('FileUploadController', ['$scope', 'Upload', function ($scope, Upload) {
    // upload later on form submit or something similar
    $scope.submit = function () {
        if($scope.form.file.$valid && $scope.files) {
            console.log('Files selected: ',$scope.files)
            $scope.uploadFiles($scope.files);
        }
        if ($scope.form.file.$valid && $scope.file) {
            console.log('Calling upload: ', $scope.file)
            $scope.upload($scope.file);
        }
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: '/api/file/upload',
            data: { file: file }, 
            info: {fileName: file.fileName} 
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    // for multiple files:
    $scope.uploadFiles = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                console.log('Uploading', files[i])
                Upload.upload({ 
                    url: "/api/file/upload", 
                    data: { file: files[i]}, 
                    info: {fileName: files[i].fileName} 
                });
            }
            // or send them all together for HTML5 browsers:
            // Upload.upload({..., data: { file: files }, ...})...;
        }
    }
}])

