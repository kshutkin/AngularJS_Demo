var app = angular.module("ModuleDemo", []);

app.controller("DemoController", function ($scope, TestFactory, TestService, TestValue, TestConstant, TestProvider) {
    $scope.TestFactory = TestFactory;
    $scope.TestService = TestService.value;
    $scope.TestValue = TestValue;
    $scope.TestConstant = TestConstant;
    $scope.TestProvider = TestProvider;
});

app.factory("TestFactory", function () {
    return "TestFactoryValue";
});

app.service("TestService", function () {
    this.value = "TestServiceValue";
});

app.value("TestValue", "TestValueValue");

app.constant("TestConstant", "TestConstantValue");

app.provider("TestProvider", function () {
    
    var value = "TestProviderValue";
    
    return {
        $get : function () {
            return value;
        },
        
        setValue : function (v) {
            value = v;
        }
    };
});

app.config(function (TestProviderProvider) {
    TestProviderProvider.setValue("ChangedProviderValue");
});