var app = angular.module("app",['ngMap']);

app.controller("Form_Controller", function($scope, $http, NgMap)
{
    $scope.appName = "¡Ayudanos!";
    $scope.center = [20.61839, -100.41068];
    $scope.latlng = [20.61839, -100.41068];

    $scope.type = "";
    $scope.avistamiento = "";
    $scope.comments = "";
    $scope.weatherInfo = "";

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
    }

    $scope.getWeather = function(){

      var u = 'http://api.openweathermap.org/data/2.5/weather?lat=' + $scope.latlng[0] + '&lon=' + $scope.latlng[1] + '&appid=ecb1f756686518281c429bf5b7498d70';

      $http({
        method: 'GET',
        url: u,
      }).then(function successCallback(response) {
          $scope.weatherInfo = response.data;
          $scope.tmp = $scope.weatherInfo.main.temp - 273.15;
          console.log($scope.weatherInfo);
        }, function errorCallback(response) {
          console.log(response);
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

    }


    var x = document.getElementById("demo");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        $scope.center = [position.coords.latitude, position.coords.longitude];
        $scope.latlng = [position.coords.latitude, position.coords.longitude];
        console.log($scope.latlng);
        $scope.$apply();

    }



    getLocation();

});
