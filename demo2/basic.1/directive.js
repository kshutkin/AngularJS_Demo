app.directive("showAnimate", function () {
    return function (scope, element, attrs) {
        scope.$watch(attrs.showAnimate, function (value) {
            if (value) {
                element.show('fast');
            } else {
                element.hide('fast');
            }
        });
    };
});