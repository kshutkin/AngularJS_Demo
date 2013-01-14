angular.module("TodoModule", [])
    .controller("TodoCtrl", function() {
        $scope.todos = [
            {text:'learn angular', done:true},
            {text:'build an angular app', done:false}
        ];
    });