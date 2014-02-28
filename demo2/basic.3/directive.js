app.directive("myDirective", function () {
    return {
        scope: {
            param: '&',
            value: '='
        },
        template: '<input type="text" ng-model="value"></input><input type="button" value="Try Me" ng-click="param({message:value})">'
    };
});