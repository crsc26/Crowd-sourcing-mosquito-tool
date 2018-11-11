mainApp.controller('MapController', function($rootScope, $scope, $location, $http) {

  $scope.center = [20.61839, -100.41068];
  $scope.latlng = [20.61839, -100.41068];

  $scope.markers = [

  ];

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
  }

  var x = document.getElementById("demo");

  function showPosition(position) {
      $scope.center = [position.coords.latitude, position.coords.longitude];
      $scope.latlng = [position.coords.latitude, position.coords.longitude];
      console.log($scope.latlng);
      $scope.center = $scope.latlng;
      $scope.$apply();

  }
  function getMarkers() {
    var response = [];

    $http({
      url: 'http://127.0.0.1:8080/seen/getAll',
      method: 'GET',
    }).then(function successCallback(data) {
              console.log(data.data);
              for(d in data.data){
                console.log(JSON.parse(data.data[d].Coordenadas));
                $scope.markers.push(JSON.parse(data.data[d].Coordenadas));
              }
          }, function errorCallback(response) {
              console.log(response);
          });

  }

  getMarkers();




  getLocation();
});
