


module.exports = {
    'test dress search results': function (browser) {

        function getAllDresses(elements) {
            elements.value.forEach(function (element) {
            let elementID = element[Object.keys(element)[0]]
            browser.elementIdText(elementID, function (result) {
                const actualText = result.value.toLowerCase();
                all_dresses.push(actualText);                     
            });
            });
        }
        
        function getDressesSearchResults(elements) {
            elements.value.forEach(function (element) {
                let elementID = element[Object.keys(element)[0]]
                browser.elementIdText(elementID, function (result) {
                    const actualText = result.value.toLowerCase();
                    dresses_search_results.push(actualText);      
                });
            });
            }
        
        function DoesResultsContainAllDresses() {
            
            // Loop through each element in the first array
            for (const element of all_dresses) {
                // Check if the element is not present in the second array
                if (!dresses_search_results.includes(element)) {
                    // If any element from arr1 is not found in arr2, return false
                    return false;
                }
            }
            // If all elements from arr1 are found in arr2, return true
            return true;

        }

        function resultsContainingDressCount() {
            let count = 0;
            for (const result of dresses_search_results) {
                if (result.includes(search_value)) {
                    count++;
                }
            }
            return Number(count/dresses_search_results.length);
        }
        

        const searchResultsPage = browser.page.searchResultsPage();
        const search_value = "dress"
        const minimumMatchingResultsRatio = Number(.7)
        const dresses_search_results = [];
        const all_dresses = [];


        searchResultsPage
            .navigate()
            .waitForElementPresent('body')
            .click('@dressesButton')
            .api.elements('css selector', "@product", getAllDresses);

        searchResultsPage
            .setValue("@search_input_area", search_value)
            .click('@searchButton')
            .api.elements('css selector',  "@product", getDressesSearchResults)
            .perform(function() {
                this.assert.equal(dresses_search_results.length == 0,false)
                this.assert.equal(all_dresses.length == 0,false)
                this.assert.equal(DoesResultsContainAllDresses(), true)
                this.assert.equal(resultsContainingDressCount() > minimumMatchingResultsRatio, true)
            })   
            .end();
      
  }
};

