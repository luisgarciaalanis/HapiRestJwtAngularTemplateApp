var myApp = angular.module('sampleApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    //
    // Now set up the states
    $stateProvider
        .state('Home', {
            url: "/",
            templateUrl: "partials/home.html",
            controller: function ($scope) {
                $scope.items = ["A", "List", "Of", "Items"];
            }
        })
        .state('Login', {
            url: "/login",
            templateUrl: "partials/login.html"
        });
});
