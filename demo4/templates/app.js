var app = angular.module("ModuleDemo", []);

app.controller("DemoController", function ($scope, $templateCache) {
    $templateCache.put('template2.html', 'This is the content of the template 2');
});

