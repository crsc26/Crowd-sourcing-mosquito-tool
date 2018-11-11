mainApp.controller('UserController', function($rootScope, $scope, $location, $http) {
    console.log("User controller");

    if($rootScope.user == null){
      $location.path('/');
    }

    console.log($rootScope.user);

    $scope.name = $rootScope.user.getName();
    $scope.photo = $rootScope.user.getImageUrl();
    $scope.email = $rootScope.user.getEmail();
    $scope.contributions = [];

    $scope.getData = function(){
      $http({
        url: 'http://127.0.0.1:8080/seen/getContrib',
        method: 'GET',
        params: {
          username : $scope.email
        }
      }).then(function successCallback(data) {
                $scope.contributions = data.data;
                console.log($scope.contributions);
            }, function errorCallback(response) {
                console.log(response);
            });
    }

    $scope.download = function(){
      var json2xls = require('json2xls');
      var fs = require('fs');
      var xls = json2xls($scope.contributions);
      fs.writeFileSync('data.xlsx', xls, 'binary');

    }


    $scope.getData();


});
