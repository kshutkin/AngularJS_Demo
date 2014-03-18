var module = angular.module("TodoModule", ['ngResource', 'ngRoute']);
    module.controller("TodoCtrl", function($scope, Item) {
        $scope.todos = Item.query();
        
        $scope.saveDone= function($index) {
            $scope.todos[$index].$update();
        };
        
        $scope.remaining = function() {
            var count = 0;
            angular.forEach($scope.todos, function(todo) {
              count += todo.done ? 0 : 1;
            });
            return count;
        };
        
        $scope.addTodo = function() {
            var item = new Item({text:$scope.todoText, done:false});
            $scope.todos.push(item);
            $scope.todoText = '';
            item.$save();
        };
        
        $scope.archive = function() {
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function(todo) {
                if (!todo.done) {
                    $scope.todos.push(todo);
                } else {
                    todo.$remove();
                }
            });
        };
    })
    .constant("apiKey", "5068cfe6e4b022999d4e599e")
    .factory("Item", function($resource, apiKey) {
        var Item = $resource("https://api.mongolab.com/api/1/databases/todos/collections/Item/:id", {
            apiKey: apiKey
        }, {
            update: {method : "PUT"}
        });
        
        Item.prototype.$remove = function() {
            Item.remove({id: this._id.$oid});
        };
            
        Item.prototype.$update = function() {
            return Item.update({id: this._id.$oid}, angular.extend({}, this, {_id:undefined}));
        };
             
        Item.prototype.done = false;
             
        return Item;
    }).config(function($routeProvider) {
        $routeProvider
            .when("/", {controller: "TodoCtrl", templateUrl: "todoctrl.html"})
            .when("/hello", {templateUrl: "hello.html"})
            .otherwise({redirectTo: "/"});
    });