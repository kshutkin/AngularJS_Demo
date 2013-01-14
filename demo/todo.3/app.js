angular.module("TodoModule", [])
    .controller("TodoCtrl", function($scope) {
        $scope.todos = [
            {text:'learn angular', done:true},
            {text:'build an angular app', done:false}
        ];
    });