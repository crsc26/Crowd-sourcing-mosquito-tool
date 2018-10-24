var app = angular.module("app",['ngMap']);

app.controller("Form_Controller", function($scope, $http, NgMap)
{
    $scope.appName = "¡Ayudanos!";
    $scope.center = [20.61839, -100.41068];
    $scope.latlng = [20.61839, -100.41068];

    $scope.getpos = function (event) {
        $scope.lat = event.latLng.lat();
        $scope.lng = event.latLng.lng();
        $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
    };


    $scope.placeMarker = function(){
        console.log(this.getPlace());
        var loc = this.getPlace().geometry.location;
        $scope.latlng = [loc.lat(), loc.lng()];
        $scope.center = [loc.lat(), loc.lng()];
    };


});
