app.directive('myDirective', function($parse) {
    return {
        restrict: 'EACM',
        link: function(scope, element, attrs) {
            var aElement = angular.element('<a></a>');
			var iElement = angular.element('<input type="text"></input>');
			
			console.log(element);
			
			var installAnchor = function () {
				element.empty();
				element.append(aElement);
				element.on("click", editAnchor);
			};
			
			var editAnchor = function(event) {
				event.preventDefault();
				event.stopPropagation();
				
				installInput();
			};
			
			var installInput = function () {
				element.empty();
				element.append(iElement);
				iElement[0].focus();
				iElement.bind('blur', editInput);
				iElement.on('keypress', function(e) {
		            var code = (e.keyCode ? e.keyCode : e.which);
		            if (code == 13) {
		                e.preventDefault();
		                editInput();
		            }  
		        });
			};
			
			var setFn = $parse(attrs.myDirective).assign;
			
			var editInput = function () {
				scope.$apply(function () {
					
					var value = iElement.val();
					
					value = value.replace('/', '-');
					
					setFn(scope, value);
				});
				
				installAnchor();
			};
			
			installAnchor();
			
			scope.$watch(attrs.myDirective, function (newValue, oldValue) {
				aElement.attr("href", "#" + newValue);
				aElement.text(newValue);
				iElement.val(newValue);
			});
        }
    };
});