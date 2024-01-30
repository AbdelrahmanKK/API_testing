module.exports = {
    url: 'http://automationpractice.multiformis.com/index.php?controller=contact', 
  
    elements: {
        message : "#message",
        email : "#email",
        subject_heading : "#id_contact",
        attach_file : "#fileUpload",
        order_reference :"#id_order",
        submitButton: '#submitMessage',
        alert:"div.alert.alert-danger",
        success:"p.alert.alert-success",
        errorList:'ol > li',
        errorMessage:".alert ol li"
    }
};