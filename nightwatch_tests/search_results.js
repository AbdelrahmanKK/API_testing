module.exports = {
  'getElements': function (browser) {

    const search_input_area = '#search_query_top'
    const search_value = "dress"
    const product_css_selector = "li.ajax_block_product a.product-name"
    const expectedText = "Dress"


          
    function getInfo(elements) {
    

      elements.value.forEach(function (element) {
        let elementID = element[Object.keys(element)[0]]

        browser.elementIdText(elementID, function (res) {
            const actualText = res.value.toLowerCase();
            const expectedTextLower = expectedText.toLowerCase();
            console.log(actualText, expectedTextLower);
            const contains_keyword = actualText.includes(expectedTextLower);
            browser.assert.equal(contains_keyword , true);
            
        });
      });
    }


    browser
      .url('http://automationpractice.multiformis.com/index.php') 
      .waitForElementPresent('body')
      .setValue(search_input_area, search_value)
      .click('button[type="submit"]')
      .elements('css selector', product_css_selector, getInfo)
      .end();

  }
};