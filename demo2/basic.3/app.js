var app = angular.module("DirectivesDemo", []);

app.controller("DemoCtrl", function($scope) {
    $scope.callMe = function (str) {
        alert("Hey!" + str);
    };
});