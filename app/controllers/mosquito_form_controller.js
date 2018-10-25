var app = angular.module("app",['ngMap']);

app.controller("Form_Controller", function($scope, $http, NgMap)
{
    $scope.appName = "¡Ayudanos!";
    $scope.center = [20.61839, -100.41068];
    $scope.latlng = [20.61839, -100.41068];

    $scope.type = "";
    $scope.avistamiento = "";
    $scope.comments = "";

    $scope.getpos = function (event) {
        $scope.lat = event.latLng.lat();
        $scope.lng = event.latLng.lng();
        $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
    };

    $scope.debug = function(){
      var jsn = {
        "latlng" : $scope.latlng,
        "type" : $scope.type,
        "seen" : $scope.avistamiento,
        "comments" : $scope.comments
      }

      var req = {
       method: 'POST',
       url: 'http://example.com',
       headers: {
         'Content-Type': undefined
       },
       data: jsn
      }

      $http(req).then(function(){
          //insert code
      },
      function(){
        //error code
      });
      
      console.log(jsn);
    }


    $scope.placeMarker = function(){
        console.log(this.getPlace());
        var loc = this.getPlace().geometry.location;
        $scope.latlng = [loc.lat(), loc.lng()];
        $scope.center = [loc.lat(), loc.lng()];
    };


});
