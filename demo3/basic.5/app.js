var app = angular.module("FiltersDemo", []);

app.controller("DemoController", function ($scope, locales) {
    $scope.locales = locales;
});

app.factory("locales", function () {
    
    var locales = ["RU", "EN"];
    
    return {
        current: locales[0],
        all: locales
    };
});

app.config(function ($filterProvider, $provide) {
    $filterProvider.register("hello", function () {
        return function (value) {
            return value ? "Hello " + value : "Hey!";
        };
    });
    
    $provide.decorator("helloFilter", function ($delegate, locales) {
        return function (value) {
            var value = value ? value : ""
            if (locales.current === "RU") {
                return "Доброе утро " + value;
            } 
            if (locales.current === "EN") {
                return "Good morning " + value;
            }
            return value;
        };
    });
    
    $provide.decorator("currencyFilter", function ($delegate, $filter, locales) {
        return function (value) {
            if (!value)
                return "";
            
            var formatted = $filter("number")(value, 2);
            
            if (locales.current === "RU") {
                return formatted + " руб.";
            } 
            if (locales.current === "EN") {
                return "$" + formatted;
            }
            return formatted;
        };
    });
});