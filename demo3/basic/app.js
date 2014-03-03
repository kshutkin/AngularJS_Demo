var app = angular.module("FiltersDemo", []);

app.controller("DemoController", function ($scope, $http) {
    $http.jsonp("//www.filltext.com/?callback=JSON_CALLBACK&rows=20&fname={firstName}&lname={lastName}&date={date}&address={streetAddress}&salary={randomDecimalRange|5000to200000}&male={bool}").
    success(function (data) {
        $scope.users = data;
    });
    
    $scope.fullName = function () {
        return item.fname + " " + item.lname;
    };
});