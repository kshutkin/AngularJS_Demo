var app = angular.module("FiltersDemo", []);

app.controller("DemoController", function ($scope) {
    $scope.encodeURIComponent = window.encodeURIComponent;
});

app.filter("encodeURIComponent", function () {
   return window.encodeURIComponent; 
});