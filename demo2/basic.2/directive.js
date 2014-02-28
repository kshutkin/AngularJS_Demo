app.directive('pane', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@'
        },
        priority: 100,
        template: '<div style="border: 1px solid black;">' + 
            '<div style="background-color: gray">{{title}}</div>' + 
            '<div ng-transclude></div>' + 
            '</div>'
    };
});