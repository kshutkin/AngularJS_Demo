angular.module("TodoModule", [])
    .controller("TodoCtrl", function($scope) {
        $scope.todos = [
            {text:'learn angular', done:true},
            {text:'build an angular app', done:false}
        ];
        
        $scope.remaining = function() {
            var count = 0;
            angular.forEach($scope.todos, function(todo) {
              count += todo.done ? 0 : 1;
            });
            return count;
        };
    });