mainApp.controller('MapController', function($rootScope, $scope, $location, $http) {

  $scope.center = [20.61839, -100.41068];
  $scope.latlng = [20.61839, -100.41068];

  $scope.markers = [

  ];

  $scope.selectedMosquito = "";


  if($rootScope.user == null){
    $location.path('/');
  }

  $scope.hideOptions = true;

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
  }

  $scope.voteNote = function(){
    $scope.hideOptions = false;
  }

  $scope.voteYes = function(){
    $scope.hideOptions = true;
    $scope.type = "yes";
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
                var coor = data.data[d].Coordenates;
                coor = coor.replace(';', ',');
                console.log(JSON.parse(coor));
                $scope.markers.push(JSON.parse(coor));
              }
          }, function errorCallback(response) {
              console.log(response);
          });

  }

  $scope.getInfo = function(coors, e) {
    var c = JSON.stringify(e);
    $scope.hideOptions = true;
    document.getElementById("modalButton").click();
    $http({
      url: 'http://127.0.0.1:8080/seen/find',
      params: {
        coordenates : c
      },
      method: 'GET',
    }).then(function successCallback(data) {
              console.log(data.data);
              $scope.selectedMosquito = data.data;
              var total = $scope.selectedMosquito.Poll.other + $scope.selectedMosquito.Poll.anopheles + $scope.selectedMosquito.Poll.culex + $scope.selectedMosquito.Poll.aedes + $scope.selectedMosquito.Poll.positive;
              if(total == 0){
                $scope.selectedMosquito.Poll["percentage_positive"] = 0;
              } else {
                $scope.selectedMosquito.Poll["percentage_positive"] = ($scope.selectedMosquito.Poll.positive / total) * 100;
                $scope.selectedMosquito.Poll["percentage_positive"] = $scope.selectedMosquito.Poll["percentage_positive"].toFixed(2);
              }
          }, function errorCallback(response) {
              console.log(response);
          });

  }

  getMarkers();


  $scope.sendVote = function(){
    document.getElementById("closeModal").click();
    $http({
      url: 'http://127.0.0.1:8080/poll/vote',
      params: {
        username: $rootScope.user.getEmail(),
        type: $scope.type,
        poll: $scope.selectedMosquito.Poll.poll
      },
      method: 'GET',
    }).then(function successCallback(data) {
              console.log(data.data);
          }, function errorCallback(response) {
              console.log(response);
          });

  }

  $scope.toHome = function(){
    $location.path('/');
  }



  getLocation();
});
