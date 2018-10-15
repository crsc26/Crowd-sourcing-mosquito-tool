var app = angular.module("app",['ngMap']);

app.controller("Form_Controller", function($scope, $http, NgMap)
{
    $scope.appName = "¡Ayudanos!";

    $scope.positions1 =[
    ];

    $scope.addMarker = function(event) {
      var ll = event.latLng;
      $scope.positions1 =[
      ];
      $scope.positions1.push({pos:[ll.lat(), ll.lng()]});
    }

});