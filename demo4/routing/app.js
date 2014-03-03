var app = angular.module("RoutsDemo", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        controller : "DemoController",
        templateUrl: "template1.html"
    })
    .when("/new", {
        controller : "NewController",
        templateUrl: "template2.html",
        resolve: {
            data: loadData
        }
    })
    .otherwise({
        redirectTo:"/"
    });
});

app.controller("DemoController", function ($scope, $location) {
    $scope.changeRoute = function () {
        console.log("before path changed");
        $location.path("/new");
    };
});

app.run(function($rootScope) {
    $rootScope.$on("$routeChangeStart", function () {
        console.log("routeChangeStart");
    });
    
    $rootScope.$on("$routeChangeSuccess", function () {
        console.log("routeChangeSuccess");
    });
});

app.controller("NewController", function ($scope, $rootScope) {
    console.log("NewController");
});

app.factory("DataFactory", function () {
    console.log("loading data in factory");
    return "someData";
});

var loadData = function ($q) {
    console.log("loading data");
    var defer = $q.defer();
    defer.resolve("someData");
    return defer.promise;
};