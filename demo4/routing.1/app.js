var app = angular.module("RoutsDemo", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        controller : "DemoController",
        templateUrl: "template1.html"
    })
    .when("/new/:param1", {
        controller : "NewController",
        templateUrl: "template2.html",
        resolve: {
            data: function () {
                return "some more data";
            } 
        }
    })
    .otherwise({
        redirectTo:"/"
    });
});

app.controller("DemoController", function ($scope, $location) {
    $scope.changeRoute = function () {
        $location.path("/new/test");
    };
});

app.controller("NewController", function ($scope, $routeParams, $route) {
    $scope.routeParams = $routeParams;
    $scope.routeCurrent = $route.current;
});
