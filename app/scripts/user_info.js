mainApp.controller('UserController', function($rootScope, $scope, $location, $http) {
    console.log("User controller");

    if($rootScope.user == null){
      $location.path('/');
    }

    $scope.toWorldMap = function(){
        $location.path('/map');
    }

    $scope.toNewContrib = function(){
        $location.path('/form');
    }


    console.log($rootScope.user);

    $scope.name = $rootScope.user.getName();
    $scope.photo = $rootScope.user.getImageUrl();
    $scope.email = $rootScope.user.getEmail();
    $scope.contributions = [];

    $scope.allContribs = [];

    function getAllData(){
      $http({
        url: 'http://127.0.0.1:8080/seen/getAll',
        method: 'GET',
      }).then(function successCallback(data) {
                console.log(data.data);
                $scope.allContribs = data.data;
            }, function errorCallback(response) {
                console.log(response);
            });
    }

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

    function convertArrayOfObjectsToCSV(args) {
            var result, ctr, keys, columnDelimiter, lineDelimiter, data;

            data = args.data || null;
            if (data == null || !data.length) {
                return null;
            }

            columnDelimiter = args.columnDelimiter || ',';
            lineDelimiter = args.lineDelimiter || '\n';

            keys = Object.keys(data[0]);

            result = '';
            result += keys.join(columnDelimiter);
            result += lineDelimiter;

            data.forEach(function(item) {
                ctr = 0;
                keys.forEach(function(key) {
                    if (ctr > 0) result += columnDelimiter;

                    result += item[key];
                    ctr++;
                });
                result += lineDelimiter;
            });

            return result;
        }

        $scope.downloadCSV = function(args) {
            var data, filename, link;
            var csv = convertArrayOfObjectsToCSV({
                data: $scope.allContribs
            });
            if (csv == null) return;

            filename = args.filename || 'export.csv';

            if (!csv.match(/^data:text\/csv/i)) {
                csv = 'data:text/csv;charset=utf-8,' + csv;
            }
            data = encodeURI(csv);

            link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', filename);
            link.click();
        }


    getAllData();
    $scope.getData();


});
