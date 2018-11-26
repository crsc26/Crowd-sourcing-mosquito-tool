var mainApp = angular.module("mainApp", ['ngRoute', 'ngMap', 'naif.base64', 'angular-hmac-sha512']);

mainApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/index.html',
			controller: 'IndexController'
		})
		.when('/form', {
			templateUrl: 'views/mosquito_form.html',
			controller: 'StudentController'
		})
    .when('/user', {
      templateUrl: 'views/user_account_page.html',
      controller: 'UserController'
    })
		.when('/map', {
			templateUrl: 'views/map.html',
			controller: 'MapController'
		})
		.otherwise({
			redirectTo: '/'
		});

});
