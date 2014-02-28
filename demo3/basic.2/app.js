var app = angular.module("FiltersDemo", []);

app.controller("DemoController", function ($scope) {
    
});

app.filter('i18n', function (localizedTexts) {
    return function (text) {
        if (localizedTexts.hasOwnProperty(text)) {
            return localizedTexts[text];
        }
        return text;
    };
});

app.value('localizedTexts', {
    'Category': 'Категория',
    'Edit': 'Редактировать',
});
