var app = angular.module("PromisesDemo", []);

app.controller("DemoController", function ($scope, $q, Data, $timeout) {
    
    var promise1 = $timeout(function () {
        return 123;
    }, 2000);
    
    $q.all([Data, promise1]).then(function (arr) {
        console.log(arr);
    });
});

app.factory("Data", function ($q, $timeout) {
    var defer = $q.defer();
    
    $timeout(function () {
        defer.notify("some action");
    }, 1000);
    
    $timeout(function () {
        defer.resolve("OK");
    }, 1500);
    
    return defer.promise;
});

