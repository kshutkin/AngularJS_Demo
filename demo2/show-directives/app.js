var module = angular.module("ShowDirectives", []);

module.controller("DemoCtrl", function($scope) {
    $scope.showFlag = true;

    var random = function(n) {
        return Math.floor(1 + Math.random() * (n));
    };

    var createBadgesBucket = function() {
        var colors = [1, 2, 3, 4],
            badges = [],
            bucket = {
                colors: colors
            };

        for (var i = 0; i < 2; i++) {
            colors.splice(random(colors.length - 1), random(2) - 1);
        }

        for (var j = 0, n = random(10); j < n; j++) {
            badges.push({
                color: colors[random(colors.length) - 1],
                parent: bucket
            });
        }

        bucket.badges = badges;

        return bucket;
    };

    var colors = ['Green', 'Red', 'Blue', 'Orange'];

    $scope.classStr = function(n) {
        return ['success', 'important', 'info', 'warning'][n - 1];
    };

    $scope.colorStr = function(n) {
        return colors[n - 1];
    };

    $scope.colorsStr = function(colorsIndexes) {

        var result = "";

        angular.forEach(colorsIndexes, function(index) {
            if (result) result += '|';
            result += colors[index - 1];
        });

        return result;
    };

    $scope.dropeBadge = function(draggable, where) {
        var what = angular.element(draggable).scope().badge;
        if (!what || !where) return;
        if (what.parent) {
            var oldBadges = what.parent.badges;
            what.parent.badges = [];
            angular.forEach(oldBadges, function(badge) {
                if (badge !== what) what.parent.badges.push(badge);
            });
        }
        what.parent = where;
        what.drope = true;
        where.badges = where.badges || [];
        where.badges.push(what);
    };
    
    $scope.getTime = function (badge) {
        return badge.drope ? 1000 : 0;
    };

    $scope.buckets = [];

    for (var i = 0; i < 6; i++) {
        $scope.buckets.push(createBadgesBucket());
    }
});

module.directive("showAfter", function($timeout) {
    return function(scope, element, attrs) {
        var timeToShow = scope.$eval(attrs.showAfter);
        if (timeToShow > 0) {
            element.hide();
            $timeout(function() {
                element.show('fast');
            }, timeToShow);
        }
    };
});

module.directive("showAnimate", function() {
     return function(scope, element, attrs) {
        scope.$watch(attrs.showAnimate, function(value) {
            if (value) {
                element.show('fast');
            }
            else {
                element.hide('fast');
            }
        });
    };
});

module.directive('input', function() {
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function(scope, elm, attr, ngModelCtrl) {
            if (!ngModelCtrl) return;

            if (attr.type === 'radio' || attr.type === 'checkbox') return;

            elm.unbind('input').unbind('keydown').unbind('change');
            elm.bind('blur', function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.val());
                });
            });
        }
    };
});

module.directive('droppableFor', function() {
    return {
        restrict: 'A',
        scope: {
            drope: '&',
            droppableFor: '@'
        },
        transclude: true,
        template: "<div ng-transclude></div>",
        link: function(scope, element, attrs) {
            scope.$watch('droppableFor', function(value) {
                var accept = (value || attrs.droppableFor).split("|");
                element.droppable({
                    addClasses: false,
                    activeClass: attrs.droppableActiveClass,
                    hoverClass: attrs.droppableHoverClass,
                    tolerance: attrs.droppableTolerance || 'pointer',
                    accept: function(elem) {
                        return $.inArray(elem.attr("draggable"), accept) != -1;
                    },
                    drop: function(event, ui) {
                        scope.$apply(function(scope) {
                            scope.drope({
                                draggable: ui.draggable,
                                droppable: element
                            });
                        });
                    }
                });
            });
        }
    };
});

module.directive("draggable", function() {
    return function(scope, element, attrs) {
        element.draggable({
            helper: attrs.draggableHelper || 'clone',
            opacity: attrs.draggableOpacity || 0.3
        });
    };
});

module.directive('pane', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@'
        },
        template: '<div style="border: 1px solid black;">' + '<div style="background-color: gray">{{title}}</div>' + '<div ng-transclude></div>' + '</div>'
    };
});