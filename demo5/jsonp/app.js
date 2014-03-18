var app = angular.module("FiltersDemo", []);

app.controller("DemoController", function ($scope, $http) {
    
    var transformResponse = function(data, headers){
        for (var i = 0; i < data.length; ++i) {
            data[i].male = data[i].male ? "male" : "female";
        }
        return data;
    };
    
    var transformRequest = function(data, headers){
        headers['Content-Type'] = 'application/json';
    };
    
    $http.jsonp("//www.filltext.com/?callback=JSON_CALLBACK&rows=20&fname={firstName}&lname={lastName}&date={date}&address={streetAddress}&salary={randomDecimalRange|5000to200000}&male={bool}",
    {
        transformResponse: transformResponse,
        transformRequest: transformRequest
    }).
    success(function (data) {
        $scope.users = data;
    });
});