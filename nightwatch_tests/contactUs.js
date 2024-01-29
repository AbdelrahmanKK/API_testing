module.exports = {
    'test insvalid input': function (browser) {

      console.log(__dirname + '/file.txt')
      const message_selector = "#message";
      const email_selector = "#email";
      const subject_heading_selector = "#id_contact";
      const attach_file_selector = "#fileUpload"

      browser
        .url('http://automationpractice.multiformis.com/index.php?controller=contact') 
        .waitForElementVisible('body')
        .setValue(message_selector,"hello, i hope this message finds you shiny")
        .setValue(email_selector,"hello@gmail.com")
        .setValue(subject_heading_selector,"c")
        .setValue(attach_file_selector, __dirname + '/upload_test.txt')
        .click('#submitMessage')
        .assert.not.elementPresent('div.alert.alert-danger')

       
      browser.end();  // Close the browser session
    },



  };