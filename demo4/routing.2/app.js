var app = angular.module("RoutsDemo", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        title: "Main Page",
        controller : "DemoController",
        templateUrl: "template1.html"
    })
    .when("/new/:param1", {
        title: "New Page",
        templateUrl: "template2.html"
    })
    .otherwise({
        redirectTo:"/"
    });
});

app.run(function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.title;
    });
});

app.controller("DemoController", function ($scope, $location) {
    $scope.changeRoute = function () {
        $location.path("/new/test");
    };
});
