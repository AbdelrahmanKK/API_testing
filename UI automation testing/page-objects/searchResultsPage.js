module.exports = {
    url: 'http://automationpractice.multiformis.com/index.php', 
  
    elements: {
        searchButton: 'button[type="submit"]',
        dressesButton: {
            selector: '.clearfix li a.sf-with-ul',
            index: 3
          },
        product : "li.ajax_block_product a.product-name",
        search_input_area : '#search_query_top',
    }
};

