describe('filter', function() {

    beforeEach(module('FiltersDemo6'));

    describe('hello', function() {

        it('should greet according to locale',
            inject(function(helloFilter, locales) {
                
                locales.current = "EN";
                expect(helloFilter("Ivan")).toBe("Good morning Ivan");
                
                locales.current = "RU";
                expect(helloFilter("Ivan")).toBe("Доброе утро Ivan");
            })
        );
    });
    
    describe('currency', function() {

        it('should display currency according to locale',
            inject(function(currencyFilter, locales) {
                
                locales.current = "EN";
                expect(currencyFilter(10)).toBe("$10.00");
                
                locales.current = "RU";
                expect(currencyFilter(10)).toBe("10.00 руб.");
            })
        );
    });
});