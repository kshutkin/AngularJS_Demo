var app = angular.module("FiltersDemo", []);

app.controller("DemoController", function ($scope) {
});

app.config(function ($filterProvider, $provide) {
    $filterProvider.register("hello", function () {
        return function (value) {
            return value ? "Hello " + value : "Hey!";
        };
    });
    
    /*$provide.decorator("helloFilter", function ($delegate) {
        return function (value) {
            return "Good morning (" + $delegate(value) + ")";
        };
    });*/
});