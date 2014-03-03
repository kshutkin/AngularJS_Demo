var app = angular.module("FiltersDemo", ["ngSanitize"]);

app.controller("DemoController", function ($scope, $http, $filter) {
    $http.jsonp("//www.filltext.com/?callback=JSON_CALLBACK&rows=20&fname={firstName}&lname={lastName}&date={date}&address={streetAddress}&salary={randomDecimalRange|5000to200000}&male={bool}").
    success(function (data) {
        $scope.users = data;
    });
    
    $filter("maplink")();
});

app.filter("maplink", function () {
    return function (address) {
        return "<a href=\"http://maps.google.com?q=" + address + "\">" + address + "</a>"; 
    };
});