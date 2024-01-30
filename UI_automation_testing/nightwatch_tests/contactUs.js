module.exports = {
        
    'error message content': function (browser) {
        const contactUsPage = browser.page.contactUsPage();

        contactUsPage
          .navigate()
          .waitForElementVisible('body')
          .click('@submitButton')
          .assert.elementPresent('@alert')
          .api.elements('css selector',"@errorList" , function(result) {
            this.assert.equal(result.value.length, 3, 'list contains 3 items');
          })
        
        browser.end();  
        
      },
  
    'required fields only': function (browser) {

      const contactUsPage = browser.page.contactUsPage();

      contactUsPage
        .navigate()
        .waitForElementVisible('body')
        .setValue("@subject_heading","Customer service")
        .setValue("@email","hello@gmail.com")
        .setValue("@message","Dear, i hope this message finds you well")
        .click("@submitButton")
        .assert.not.elementPresent("@alert")
        .assert.elementPresent("@success")

      browser.end();  
    },


    'all fields': function (browser) {

        const contactUsPage = browser.page.contactUsPage();

        contactUsPage
          .navigate()
          .waitForElementVisible('body')
          .setValue("@subject_heading","Customer service")
          .setValue("@message","Dear, i hope this message finds you well")
          .setValue("@email","hello@gmail.com")
          .setValue("@order_reference","demo_2")
          .setValue("@attach_file", __dirname + '/test_upload_files/valid_file_upload.txt')
          .click("@submitButton")
          .assert.not.elementPresent("@alert")
          .assert.elementPresent("@success")
    
        browser.end();  
      },

    'without email': function (browser) {

        const contactUsPage = browser.page.contactUsPage();
        contactUsPage
          .navigate()
          .waitForElementVisible('body')
          .setValue("@subject_heading","Customer service")
          .setValue("@message","Dear, i hope this message finds you well")
          .setValue("@order_reference","demo_2")
          .setValue("@attach_file", __dirname + '/test_upload_files/valid_file_upload.txt')
          .click("@submitButton")
          .assert.elementPresent("@alert")
          .assert.containsText("@errorMessage", "Invalid email address.")
  
         
        browser.end();  // Close the browser session
      },
  

    'without message': function (browser) {
        
        const contactUsPage = browser.page.contactUsPage();

        contactUsPage
          .navigate()
          .waitForElementVisible('body')
          .setValue("@subject_heading","Customer service")
          .setValue("@email","hello@gmail.com")
          .setValue("@order_reference","demo_2")
          .setValue("@attach_file", __dirname + '/test_upload_files/valid_file_upload.txt')
          .click("@submitButton")
          .assert.elementPresent("@alert")
          .assert.containsText("@errorMessage", "The message cannot be blank.")
  
         
        browser.end();  // Close the browser session
      },
  

    'without subject heading': function (browser) {
        
        const contactUsPage = browser.page.contactUsPage();

        contactUsPage
            .navigate()
            .waitForElementVisible('body')
            .setValue("@email","hello@gmail.com")
            .setValue("@message","Dear, i hope this message finds you well")
            .setValue("@order_reference","demo_2")
            .setValue("@attach_file", __dirname + '/test_upload_files/valid_file_upload.txt')
            .click("@submitButton")
            .assert.elementPresent("@alert")
            .assert.containsText("@errorMessage", "Please select a subject from the list provided.")

            
        browser.end();  // Close the browser session
    },
  

    'invalid email address': function (browser) {

      const contactUsPage = browser.page.contactUsPage();

      contactUsPage
        .navigate()
        .waitForElementVisible('body')
        .setValue("@subject_heading","Customer service")
        .setValue("@email","hello.gmail.com")
        .setValue("@message","Dear, i hope this message finds you well")
        .click("@submitButton")
        .assert.elementPresent("@alert")
        .assert.containsText("@errorMessage", "Invalid email address.")

       
      browser.end();  
    },


    'invalid email address with special character': function (browser) {

        const contactUsPage = browser.page.contactUsPage();
  
        contactUsPage
          .navigate()
          .waitForElementVisible('body')
          .setValue("@subject_heading","Customer service")
          .setValue("@email","**hello@gmail.com")
          .setValue("@message","Dear, i hope this message finds you well")
          .click("@submitButton")
          .assert.elementPresent("@alert")
          .assert.containsText("@errorMessage", "Invalid email address.")
         
        browser.end();  
      },
  
      
    'invalid email address with double dot in the middle': function (browser) {

        const contactUsPage = browser.page.contactUsPage();
  
        contactUsPage
          .navigate()
          .waitForElementVisible('body')
          .setValue("@subject_heading","Customer service")
          .setValue("@email","hello@gmail..com.")
          .setValue("@message","Dear, i hope this message finds you well")
          .click("@submitButton")
          .assert.elementPresent("@alert")
          .assert.containsText("@errorMessage", "Invalid email address.")
         
        browser.end();  
      },
  
    

    'invalid message': function (browser) {
        
        const contactUsPage = browser.page.contactUsPage();

        contactUsPage
          .navigate()
          .waitForElementVisible('body')
          .setValue("@email","hello@gmail.com")
          .setValue("@subject_heading","Customer service")
          .setValue("@message","     ")
          .setValue("@order_reference","demo_2")
          .setValue("@attach_file", __dirname + '/test_upload_files/valid_file_upload.txt')
          .click("@submitButton")
          .assert.elementPresent("@alert")
  
         
        browser.end();  // Close the browser session
      },

    'invalid file extension': function (browser) {
        
        const contactUsPage = browser.page.contactUsPage();

        contactUsPage
          .navigate()
          .waitForElementVisible('body')
          .setValue("@email","hello@gmail.com")
          .setValue("@subject_heading","Customer service")
          .setValue("@message","     ")
          .setValue("@order_reference","demo_2")
          .setValue("@attach_file", __dirname + '/test_upload_files/invalid_file_upload.err')
          .click("@submitButton")
          .assert.elementPresent("@alert")
  
        browser.end();  // Close the browser session
        
      },
  
  };