var ngStorage = require('ngstorage');
require('./JwtAuth');
var myApp = angular.module('sampleApp', ['ui.router', 'JwtAuth', ngStorage.name]);
var ApplicationController = require('./controllers/ApplicationController');
var LoginController = require('./controllers/LoginController');

myApp.config(function($stateProvider, $urlRouterProvider, JwtAuthProvider) {
    JwtAuthProvider.loginUrl = '/api/v1/login';
    JwtAuthProvider.logoutRedirect = 'Login';

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");

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
            templateUrl: "partials/login.html",
            controller: 'LoginController as loginCtrl',
            params: {
                adminProtected: false
            }
        });
});
